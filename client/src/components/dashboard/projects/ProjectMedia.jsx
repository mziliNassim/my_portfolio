import { Link2, UploadCloud, CheckCircle } from "lucide-react";

const ProjectMedia = ({
  posterType,
  setPosterType,
  projectData,
  setProjectData,
  posterFile,
  handleImageUpload,
  imageCompressing,
}) => (
  <div className="space-y-6">
    <p className="text-slate-400">
      Upload or provide a URL for your project image
    </p>

    {/* Poster Type Selection */}
    <div className="flex space-x-4">
      <button
        type="button"
        onClick={() => setPosterType("url")}
        className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
          posterType === "url"
            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
            : "bg-white/5 text-slate-300 border border-white/20 hover:bg-white/10"
        }`}
      >
        <Link2 className="w-4 h-4" />
        <span>Image URL</span>
      </button>
      <button
        type="button"
        onClick={() => setPosterType("upload")}
        className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
          posterType === "upload"
            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
            : "bg-white/5 text-slate-300 border border-white/20 hover:bg-white/10"
        }`}
      >
        <UploadCloud className="w-4 h-4" />
        <span>Upload File</span>
      </button>
    </div>

    {/* Poster Input */}
    {posterType === "url" && (
      <div className="group">
        <input
          type="text"
          value={projectData.poster}
          onChange={(e) =>
            setProjectData({
              ...projectData,
              poster: e.target.value,
            })
          }
          className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 placeholder-slate-400"
          placeholder="https://example.com/your-project-image.jpg"
        />
      </div>
    )}

    {posterType === "upload" && (
      <div className="group">
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-blue-500 file:to-purple-600 file:text-white file:cursor-pointer"
            disabled={imageCompressing}
          />
          {imageCompressing && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        {posterFile && projectData.poster && (
          <div className="mt-4 relative">
            <img
              src={projectData.poster}
              alt="Preview"
              className="max-h-48 w-full object-cover rounded-xl shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
            <p className="text-sm text-slate-300 mt-2 flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>Image compressed and uploaded successfully</span>
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Original: {(posterFile.size / 1024).toFixed(1)}KB | Compressed:{" "}
              {((projectData.poster.length * 0.75) / 1024).toFixed(1)}KB
            </p>
          </div>
        )}
      </div>
    )}
  </div>
);

export default ProjectMedia;
