import uploadAvatar from "../middleware/uploadAvatarMiddleware";
import Sach from "../models/Sach";
import fileRemove from "../utils/fileRemove";

export const createSach = async (req, res) => {
  try {
    const sach = new Sach({
      tenSach: "Sample title",
      donGia: "100000",
      photo: "",
      caption:
        "Sau khi chết, người đàn ông nọ đã tái sinh thành một cậu ấm con nhà quyền quý, dù có cuộc sống mới nhưng anh vẫn chấp niệm với tư tưởng ở thế giới hiện đại, song cũng nhờ những hành động gắn liền với cái mác “hiện đại” ấy mà anh đã chiếm được lòng tin của các nàng tiểu thư danh gia vọng tộc.",
      tacGia: "Tran Huu Loc",
      soQuyen: 10,
      namXuatBan: 1999,

      // user: req.user._id,
    });
    const createSach = await sach.save();
    return res.json(createSach);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllSach = async (req, res) => {
  try {
    let query = {};

    if (req.query.search) {
      query.tenSach = { $regex: req.query.search, $options: "i" };
    }

    if (req.query.namXuatBan) {
      query.namXuatBan = req.query.namXuatBan;
    }

    if (req.query.country) {
      query.country = req.query.country;
    }

    if (req.query.category) {
      query.category = req.query.category;
    }

    let sort = {};
    if (req.query.sort) {
      if (req.query.sort === "tenSachAZ") {
        sort = { tenSach: 1 };
      } else if (req.query.sort === "tenSachZA") {
        sort = { tenSach: -1 };
      } else if (req.query.sort === "viewPlus") {
        sort = { view: 1 };
      } else if (req.query.sort === "viewDown") {
        sort = { view: -1 };
      }
    } else {
      sort = { tenSach: 1 };
    }

    const sach = await Sach.find(query)
      .populate([
        {
          path: "category",
          select: ["title"],
        },
      ])
      .sort(sort);

    return res.json(sach);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDetailSach = async (req, res, next) => {
  try {
    const sach = await Sach.findOne({ _id: req.params.id }).populate({
      path: "category",
      select: "title",
    });
    if (!sach) {
      const error = new Error("Không tìm thấy sách");
      return next(error);
    }
    sach.view += 1;
    await sach.save();
    return res.json(sach);
  } catch (error) {
    next(error);
  }
};

export const updateSach = async (req, res, next) => {
  try {
    const sach = await Sach.findOne({ _id: req.params.id });
    if (!sach) {
      const error = new Error("Không tìm thấy Sách");
      next(error);
      return;
    }

    const upload = uploadAvatar.single("photoSach");

    const handlerUploadSach = async (data) => {
      try {
        if (typeof data !== "string") {
          throw new Error("Data is not a valid JSON string");
        }
        const {
          tenSach,
          donGia,
          soQuyen,
          namXuatBan,
          caption,
          tacGia,
          category,
          country,
          checked,
        } = JSON.parse(data);

        sach.tenSach = tenSach || sach.tenSach;
        sach.donGia = donGia || sach.donGia;
        sach.soQuyen = soQuyen || sach.soQuyen;
        sach.namXuatBan = namXuatBan || sach.namXuatBan;
        sach.caption = caption || sach.caption;
        sach.tacGia = tacGia || sach.tacGia;
        sach.category = category || sach.category;
        sach.country = country || sach.country;
        sach.checked = checked || sach.checked;

        const updateSach = await sach.save();
        return res.json(updateSach);
      } catch (error) {
        // Xử lý bất kỳ lỗi nào xảy ra
        next(error);
      }
    };

    upload(req, res, async function (err) {
      if (err) {
        const error = new Error("Không thể upload ảnh sách" + err.message);
        return next(error);
      } else {
        if (req.file) {
          let filename;
          filename = sach.photo;
          if (filename) {
            fileRemove(filename);
          }
          sach.photo = req.file.filename;
          handlerUploadSach(req.body.document);
        } else {
          let filename;
          filename = sach.photo;
          sach.photo = "";
          fileRemove(filename);
          handlerUploadSach(req.body.document);
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSach = async (req, res) => {
  try {
    const { idSach } = req.params;
    const sach = await Sach.findById(idSach);
    if (!sach) {
      return res.status(404).json({ message: "Sách không tồn tại" });
    }

    await Sach.findByIdAndDelete(idSach);
    res.json({ message: "Xóa sách thành công" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
