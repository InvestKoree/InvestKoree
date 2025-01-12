// import { v2 as cloudinary } from 'cloudinary';
// const uploadFileToCloudinary = (file, folder, resourceType = 'auto') =>
//     new Promise((resolve, reject) => {
//       const uploadStream = cloudinary.uploader.upload_stream(
//         { folder, resource_type: resourceType, quality: 'auto' },
//         (error, result) => {
//           if (error) reject(error);
//           else resolve(result.secure_url);
//         }
//       );
//       uploadStream.end(file.buffer); // End the stream with the file buffer
//     });
  

//     const uploadFiles = async (files) => {
//         const uploadResults = await Promise.allSettled(
//           files.map(({ file, folder }) => {
//             // Determine resource type based on MIME type
//             const mimeType = file.mimetype.split('/')[0]; // e.g., 'image', 'video'
//             const resourceType = mimeType === 'image' || mimeType === 'video' ? mimeType : 'raw'; // Default to 'raw' for documents
      
//             return uploadFileToCloudinary(file, folder, resourceType);
//           })
//         );
      
//         return uploadResults.map((result) =>
//           result.status === 'fulfilled' ? result.value : null
//         );
//       };
      
// module.exports = { uploadFileToCloudinary, uploadFiles };
