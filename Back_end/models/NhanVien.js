import { Schema, model } from "mongoose";

const NhanVienSchema = new Schema(
  {
    hoTenNV: { type: String, require: true, default: "Name Nhan Vien" },
    chucVu: { type: String, require: true },
    diaChi: { type: String, default: "" },
    soDienThoai: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const NhanVien = model("NhanVien", NhanVienSchema);
export default NhanVien;
