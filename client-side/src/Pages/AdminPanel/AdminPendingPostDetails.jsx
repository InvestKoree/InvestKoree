import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const AdminPendingPostDetail = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `${API_URL}/founderpost/pendingpost/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch post details");
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching post details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, API_URL]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading-spinner loading-lg"></span>
      </div>
    );

  if (!post) return <p className="text-center text-red-500">No post found</p>;

  return (
    <div className="p-6 lg:ml-80">
      <h1 className="text-2xl font-bold mb-4">{post.businessName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <p>
          <strong>Email:</strong> {post?.email}
        </p>
        <p>
          <strong>Address:</strong> {post?.address}
        </p>
        <p>
          <strong>Phone:</strong> {post?.phone}
        </p>
        <p>
          <strong>Bkash Number:</strong> {post?.bkash}
        </p>
        <p>
          <strong>Description:</strong> {post?.description}
        </p>
        <p>
          <strong>Business Category:</strong> {post?.businessCategory}
        </p>
        <p>
          <strong>Business Sector:</strong> {post?.businessSector}
        </p>
        <p>
          <strong>Investment Duration:</strong> {post?.investmentDuration}
        </p>
        <p>
          <strong>Security Option:</strong> {post?.securityOption}
        </p>
        <p>
          <strong>Other Security Option:</strong>{" "}
          {post?.otherSecurityOption || "N/A"}
        </p>
        <p>
          <strong>Documentation Option:</strong> {post?.documentationOption}
        </p>
        <p>
          <strong>Other Documentation Option:</strong>{" "}
          {post?.otherDocumentationOption || "N/A"}
        </p>
        <p>
          <strong>Assets:</strong> {post?.assets}
        </p>
        <p>
          <strong>Revenue:</strong> {post?.revenue}
        </p>
        <p>
          <strong>Funding Amount:</strong> {post?.fundingAmount}
        </p>
        <p>
          <strong>Funding Help:</strong> {post?.fundingHelp}
        </p>
        <p>
          <strong>Return Plan:</strong> {post?.returnPlan}
        </p>
        <p>
          <strong>Business Safety:</strong> {post?.businessSafety}
        </p>
        <p>
          <strong>Additional Comments:</strong>{" "}
          {post?.additionalComments || "N/A"}
        </p>
        <p>
          <strong>Projected ROI:</strong> {post?.projectedROI}
        </p>
        <p>
          <strong>Return Date:</strong> {post?.returndate}
        </p>
        <p>
          <strong>Start Date:</strong>{" "}
          {post?.startDate
            ? new Date(post.startDate).toLocaleDateString()
            : "N/A"}
        </p>

        {/* File Links */}
        {[
          { label: "NID File", url: post?.nidCopy },
          { label: "Video File", url: post?.video },
          { label: "TIN File", url: post?.tinCopy },
          { label: "Tax File", url: post?.taxCopy },
          { label: "Trade License File", url: post?.tradeLicense },
          { label: "Bank Statement File", url: post?.bankStatement },
          { label: "Security File", url: post?.securityFile },
          { label: "Financial File", url: post?.financialFile },
        ].map(({ label, url }, index) => (
          <p key={index}>
            <strong>{label}:</strong>{" "}
            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View
              </a>
            ) : (
              "N/A"
            )}
          </p>
        ))}
        <div>
          <strong>Business Pictures:</strong>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            {post?.businessPicture?.length > 0 ? (
              post.businessPicture.map((pic, index) => (
                <img
                  key={index}
                  src={pic}
                  alt={`Business Picture ${index + 1}`}
                  className="w-full h-40 object-cover rounded"
                />
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPendingPostDetail;
