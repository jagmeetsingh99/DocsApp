export const categorizeFile = (name) => {
  const ext = name.split('.').pop().toLowerCase();

  if (ext === "pdf") return "pdf";
  if (["png","jpg","jpeg","gif","webp"].includes(ext)) return "image";
  if (["mp4","mov","avi"].includes(ext)) return "video";
  if (["zip","rar","7z"].includes(ext)) return "zip";

  return "file";
};
