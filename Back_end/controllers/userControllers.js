import uploadAvatar from "../middleware/uploadAvatarMiddleware";
import Comment from "../models/Comment";
import DocGia from "../models/DocGia";
import NhanVien from "../models/NhanVien";
import Post from "../models/Post";
import User from "../models/User";
import fileRemove from "../utils/fileRemove";

export const registerUser = async (req, res, next) => {
  try {
    const {
      email,
      password,
      hoTenNV,
      chucVu,
      diaChi,
      soDienThoai,
      hoLot,
      ten,
      ngaySinh,
      phai,
      role,
    } = req.body;

    // Kiểm tra xem email đã được sử dụng chưa
    let user = await User.findOne({ email });
    let userInfo = null;

    if (user) {
      throw new Error("Email đã được đăng ký");
    }

    if (role === "nhanvien") {
      const nhanVien = new NhanVien({
        hoTenNV,
        chucVu,
        diaChi,
        soDienThoai,
      });
      await nhanVien.save();
      userInfo = {
        _id: nhanVien._id,
        hoTenNV: nhanVien.hoTenNV,
        chucVu: nhanVien.chucVu,
      };
    } else if (role === "docgia") {
      const docGia = new DocGia({
        hoLot,
        ten,
        ngaySinh,
        diaChi,
        soDienThoai,
        phai,
      });
      await docGia.save();
      userInfo = {
        _id: docGia._id,
        hoLot: docGia.hoLot,
        ten: docGia.ten,
      };
    } else {
      throw new Error("Vai trò không hợp lệ");
    }

    // Tạo tài khoản người dùng
    user = new User({
      email,
      password,
      [role]: userInfo._id,
    });

    await user.save();
    if (user.nhanvien) {
      userInfo = await NhanVien.findById(user.nhanvien);
    } else if (user.docgia) {
      userInfo = await DocGia.findById(user.docgia);
    }
    return res.status(201).json({
      _id: user._id,
      email: user.email,
      token: await user.generateJWT(),
      userInfo,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      throw new Error("Khong tim thay email");
    }

    let userInfo = null;
    if (user.nhanvien) {
      userInfo = await NhanVien.findById(user.nhanvien);
    } else if (user.docgia) {
      userInfo = await DocGia.findById(user.docgia);
    }

    if (await user.comparePassword(password)) {
      return res.status(201).json({
        _id: user._id,
        email: user.email,
        userInfo,
        token: await user.generateJWT(),
      });
    } else {
      throw new Error("Email hoac mat khau sai");
    }
  } catch (error) {
    next(error);
  }
};

export const userProfile = async (req, res, next) => {
  try {
    let user = await User.findById(req.user._id);
    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }
    let userInfo = null;
    if (user.nhanvien != null) {
      // Lấy thông tin nhân viên
      userInfo = await NhanVien.findById(user.nhanvien);
    } else if (user.docgia != null) {
      userInfo = await DocGia.findById(user.docgia);
    } else {
      throw new Error("Vai trò không hợp lệ");
    }
    const userData = userInfo._doc;
    return res.status(201).json({
      _id: user._id,
      email: user.email,
      ...userData, // Chuyển đổi userInfo thành plain JavaScript object
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    let user = await User.findById(req.user._id); // Lấy id của người dùng từ URL
    const {
      email,
      hoTenNV,
      chucVu,
      diaChi,
      soDienThoai,
      hoLot,
      ten,
      ngaySinh,
      phai,
    } = req.body;

    let userInfo = null;

    // Kiểm tra xem người dùng tồn tại trong hệ thống hay không

    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }
    await User.findByIdAndUpdate(user._id, { email }, { new: true });

    if (user.nhanvien != null) {
      // Cập nhật thông tin nhân viên
      await NhanVien.findByIdAndUpdate(
        user.nhanvien,
        { hoTenNV, chucVu, diaChi, soDienThoai },
        { new: true } // Trả về document mới sau khi cập nhật
      );
      userInfo = { hoTenNV, chucVu };
    } else if (user.docgia != null) {
      // Cập nhật thông tin độc giả
      await DocGia.findByIdAndUpdate(
        user.docgia,
        { hoLot, ten, ngaySinh, diaChi, soDienThoai, phai },
        { new: true } // Trả về document mới sau khi cập nhật
      );
      userInfo = { hoLot, ten };
    } else {
      throw new Error("Vai trò không hợp lệ");
    }

    return res.status(200).json({
      _id: user._id,
      email: email,
      ...userInfo,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const updateProfileAvatar = async (req, res, next) => {
  try {
    const upload = uploadAvatar.single("profileAvatar");

    upload(req, res, async function (err) {
      if (err) {
        const error = new Error("Không thể upload Avatar" + err.message);
        return next(error);
      } else {
        if (req.file) {
          let filename;
          let updateUser = await User.findById(req.user._id);
          filename = updateUser.avatar;
          if (filename) {
            fileRemove(filename);
          }
          updateUser.avatar = req.file.filename;
          await updateUser.save();
          res.json({
            _id: updateUser._id,
            avatar: updateUser.avatar,
            name: updateUser.name,
            email: updateUser.email,
            verified: updateUser.verified,
            admin: updateUser.admin,
            token: await updateUser.generateJWT(),
          });
        } else {
          let filename;
          let updateUser = await User.findById(req.user._id);
          filename = updateUser.avatar;
          updateUser.avatar = "";
          await updateUser.save();
          fileRemove(filename);
          res.json({
            _id: updateUser._id,
            avatar: updateUser.avatar,
            name: updateUser.name,
            email: updateUser.email,
            verified: updateUser.verified,
            admin: updateUser.admin,
            token: await updateUser.generateJWT(),
          });
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const userId = await req.params.userId;

    await User.deleteOne({ _id: userId });

    res.send({
      message: "Taì khoản này đã được xóa !",
    });
  } catch (error) {
    next(error);
  }
};

export const updateCheck = async (req, res) => {
  const userId = await req.params.userId;
  const { check } = req.body;

  try {
    // Tìm người dùng theo userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "Người dùng không tồn tại" });
    }

    // Cập nhật trường "check" cho người dùng
    user.check = check;
    await user.save();

    return res.status(201).json({
      _id: user._id,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      verified: user.verified,
      admin: user.admin,
      check: user.check,
      token: await user.generateJWT(),
    });
  } catch (error) {
    return res.status(500).json({ error: "Lỗi server" });
  }
};
