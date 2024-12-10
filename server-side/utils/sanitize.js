export const sanitizeFilename = (filename) => {
    // Remove any unsafe characters
    return filename
      .replace(/[^a-zA-Z0-9-_\.]/g, "_") // Replace unsafe characters with underscores
      .replace(/_{2,}/g, "_") // Replace multiple underscores with a single underscore
      .substring(0, 255); // Limit filename length to 255 characters
  };