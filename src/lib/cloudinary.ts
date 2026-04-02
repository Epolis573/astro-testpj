interface CloudinaryFolderAsset {
  secure_url: string;
}

interface CloudinaryFolderResponse {
  resources?: CloudinaryFolderAsset[];
}

interface GetCloudinaryFolderUrlsOptions {
  folderName: string;
  maxResults?: number;
  transformation?: string;
}

export async function getCloudinaryFolderUrls({
  folderName,
  maxResults = 30,
  transformation,
}: GetCloudinaryFolderUrlsOptions): Promise<string[]> {
  const cloudName = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = import.meta.env.CLOUDINARY_API_KEY;
  const apiSecret = import.meta.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return [];
  }

  try {
    const auth = btoa(`${apiKey}:${apiSecret}`);
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          expression: `asset_folder="${folderName}"`,
          max_results: maxResults,
        }),
      },
    );

    const data = (await response.json()) as CloudinaryFolderResponse;

    if (!data.resources?.length) {
      return [];
    }

    return data.resources.map(({ secure_url }) => {
      if (!transformation) {
        return secure_url;
      }

      return secure_url.replace(
        "/image/upload/",
        `/image/upload/${transformation}/`,
      );
    });
  } catch (error) {
    console.error(`Error fetching Cloudinary folder "${folderName}":`, error);
    return [];
  }
}

export default getCloudinaryFolderUrls;
