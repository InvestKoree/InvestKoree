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

  if (loading) return <span className="loading-spinner loading-lg"></span>;
  if (!post) return <p>No post found</p>;

  return (
    <div className="p-6 lg:ml-80">
      <h1 className="text-2xl font-bold mb-4">{post.businessName}</h1>
      <div className="grid grid-cols-2 gap-4">
        <p>
          <strong>Email:</strong> {post.email}
        </p>
        <p>
          <strong>Address:</strong> {post.address}
        </p>
        <p>
          <strong>Phone:</strong> {post.phone}
        </p>
        <p>
          <strong>Description:</strong> {post.description}
        </p>
        <p>
          <strong>Business Category:</strong> {post.businessCategory}
        </p>
        <p>
          <strong>Business Sector:</strong> {post.businessSector}
        </p>
        <p>
          <strong>Investment Duration:</strong> {post.investmentDuration}
        </p>
        <p>
          <strong>Security Option:</strong> {post.securityOption}
        </p>
        <p>
          <strong>Other Security Option:</strong>{" "}
          {post.otherSecurityOption || "N/A"}
        </p>
        <p>
          <strong>Documentation Option:</strong> {post.documentationOption}
        </p>
        <p>
          <strong>Other Documentation Option:</strong>{" "}
          {post.otherDocumentationOption || "N/A"}
        </p>
        <p>
          <strong>Assets:</strong> {post.assets}
        </p>
        <p>
          <strong>Revenue:</strong> {post.revenue}
        </p>
        <p>
          <strong>Funding Amount:</strong> {post.fundingAmount}
        </p>
        <p>
          <strong>Funding Help:</strong> {post.fundingHelp}
        </p>
        <p>
          <strong>Return Plan:</strong> {post.returnPlan}
        </p>
        <p>
          <strong>Business Safety:</strong> {post.businessSafety}
        </p>
        <p>
          <strong>Additional Comments:</strong>{" "}
          {post.additionalComments || "N/A"}
        </p>
        <p>
          <strong>Projected ROI:</strong> {post.projectedROI}
        </p>
        <p>
          <strong>Return Date:</strong> {post.returndate}
        </p>
        <p>
          <strong>Start Date:</strong>{" "}
          {new Date(post.startDate).toLocaleDateString()}
        </p>
        <div>
          <strong>Business Pictures:</strong>
          <div className="grid grid-cols-3 gap-2">
            {post.businessPicture.map((pic, index) => (
              <img
                key={index}
                src={pic}
                alt={`Business Picture ${index + 1}`}
                className="w-full h-40 object-cover rounded"
              />
            ))}
          </div>
        </div>
        <p>
          <strong>NID File:</strong>{" "}
          {post.nidCopy ? (
            <a href={post.nidCopy} target="_blank" rel="noopener noreferrer">
              View
            </a>
          ) : (
            "N/A"
          )}
        </p>
        <p>
          <strong>Video File:</strong>{" "}
          {post.video ? (
            <a href={post.videoFile} target="_blank" rel="noopener noreferrer">
              View
            </a>
          ) : (
            "N/A"
          )}
        </p>
        <p>
          <strong>TIN File:</strong>{" "}
          {post.tinCopy ? (
            <a href={post.tinCopy} target="_blank" rel="noopener noreferrer">
              View
            </a>
          ) : (
            "N/A"
          )}
        </p>
        <p>
          <strong>Tax File:</strong>{" "}
          {post.taxCopy ? (
            <a href={post.taxCopy} target="_blank" rel="noopener noreferrer">
              View
            </a>
          ) : (
            "N/A"
          )}
        </p>
        <p>
          <strong>Trade License File:</strong>{" "}
          {post.tradeLicense ? (
            <a
              href={post.tradeLicense}
              target="_blank"
              rel="noopener noreferrer"
            >
              View
            </a>
          ) : (
            "N/A"
          )}
        </p>
        <p>
          <strong>Bank Statement File:</strong>{" "}
          {post.bankStatement ? (
            <a
              href={post.bankStatement}
              target="_blank"
              rel="noopener noreferrer"
            >
              View
            </a>
          ) : (
            "N/A"
          )}
        </p>
        <p>
          <strong>Security File:</strong>{" "}
          {post.securityFile ? (
            <a
              href={post.securityFile}
              target="_blank"
              rel="noopener noreferrer"
            >
              View
            </a>
          ) : (
            "N/A"
          )}
        </p>
        <p>
          <strong>Financial File:</strong>{" "}
          {post.financialFile ? (
            <a
              href={post.financialFile}
              target="_blank"
              rel="noopener noreferrer"
            >
              View
            </a>
          ) : (
            "N/A"
          )}
        </p>
      </div>
    </div>
  );
};

export default AdminPendingPostDetail;
