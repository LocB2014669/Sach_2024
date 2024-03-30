import Sach from "../models/Sach";
import TheoDoiMuonSach from "../models/TheoDoiMuonSach";

export const createMuonSach = async (req, res) => {
  try {
    const { soLuongMuon } = req.body;
    const { idSach } = req.params;
    const sach = await Sach.findOne({ _id: idSach });
    const existingMuonSach = await TheoDoiMuonSach.findOne({
      user: req.user._id,
      sach: sach._id,
    });
    if (existingMuonSach) {
      return res.status(400).json({
        message: "Bạn đã mượn quyển sách này, cần chờ Admin duyệt để tiếp tục",
      });
    }

    const newMuonSach = new TheoDoiMuonSach({
      user: req.user._id,
      sach: sach._id,
      soLuongMuon: soLuongMuon ? soLuongMuon : 1,
    });

    const createdMuonSach = await newMuonSach.save();

    return res.json(createdMuonSach);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getMuonSachByUser = async (req, res) => {
  try {
    const userId = req.user._id; // Lấy userId từ req.user
    const muonSachList = await TheoDoiMuonSach.find({ user: userId }).populate({
      path: "sach",
      select: "tenSach photo",
    });

    return res.json(muonSachList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const deleteMuonSach = async (req, res) => {
  try {
    const { idMuonSach } = req.params;
    const muonSachList = await TheoDoiMuonSach.findByIdAndDelete({
      _id: idMuonSach,
    });

    if (!muonSachList) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy dữ liệu để xóa." });
    }

    return res.json({ message: "Xóa thành công." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getAllMuonSach = async (req, res) => {
  try {
    const muonSachList = await TheoDoiMuonSach.find({}).populate([
      {
        path: "sach",
        select: "tenSach photo",
      },
      {
        path: "user",
        select: "email",
      },
    ]);

    if (!muonSachList || muonSachList.length === 0) {
      return res.status(404).json({ message: "Không có dữ liệu" });
    }

    return res.json(muonSachList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const checkTheMuon = async (req, res) => {
  try {
    const { idMuonSach } = req.params;

    const muonSach = await TheoDoiMuonSach.findById(idMuonSach);
    if (!muonSach) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy thông tin mượn sách" });
    }

    muonSach.check = !muonSach.check;
    const updatedMuonSach = await muonSach.save();

    return res.json(updatedMuonSach);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
