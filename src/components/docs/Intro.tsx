import { DocClicked } from "@/types/types";

// components/docs/Intro.tsx
export const sectionData = [
  { id: "intro-overview", title: "Introduction Overview" },
  { id: "intro-purpose", title: "Purpose of Veltyr" },
  { id: "intro-benefits", title: "Benefits of Using Veltyr" },
];

export default function Intro({}: DocClicked) {
  return (
    <div className="space-y-8 pb-8">
      {/* Aperçu de l'introduction */}
      <section id="intro-overview" className="space-y-4">
        <h1 className="text-3xl font-bold">Introduction Overview</h1>
        <p className="text-lg leading-relaxed">
          Welcome to Veltyr, your secure and decentralized storage solution.
          Veltyr offers a simple, reliable, and highly secure platform for developers and users to manage digital files over a decentralized infrastructure.
        </p>
        <p className="text-lg leading-relaxed">
          Leveraging IPFS (InterPlanetary File System), Veltyr ensures that your files remain safe, accessible, and resilient against tampering, regardless of your location.
          Additionally, file metadata is efficiently managed in a traditional database, allowing fast retrieval and flexible management of your data.
        </p>
      </section>

      <section id="intro-purpose" className="space-y-4">
        <h2 className="text-2xl font-semibold">Purpose of Veltyr</h2>
        <p className="text-lg leading-relaxed">
          Veltyr was designed to address the challenges of traditional centralized storage solutions, where control, privacy, and resilience are often limited.
          In today’s digital landscape, data autonomy and privacy are crucial. Veltyr empowers users by giving them control over their data without relying on centralized entities.
        </p>
        <p className="text-lg leading-relaxed">
          Whether you are a developer looking to integrate decentralized storage into your application, or an end-user seeking a secure and flexible file management tool, Veltyr offers the features and adaptability needed to meet modern data storage demands.
        </p>
      </section>

      <section id="intro-benefits" className="space-y-4">
        <h2 className="text-2xl font-semibold">Benefits of Using Veltyr</h2>
        <ul className="list-disc list-inside space-y-2 text-lg leading-relaxed">
          <li>
            <strong>Data Ownership:</strong> Veltyr ensures you retain full ownership of your data. Files are stored on IPFS, a decentralized protocol, ensuring that no single entity has control over your information.
          </li>
          <li>
            <strong>Immutability:</strong> Once files are uploaded to Veltyr, they become immutable, meaning they cannot be altered or deleted. This guarantees data integrity and permanence, making it an ideal solution for archival and record-keeping purposes.
          </li>
          <li>
            <strong>Enhanced Security:</strong> By using IPFS, Veltyr offers a tamper-proof storage solution, resilient to censorship and unauthorized access. Files are securely stored with options for encryption to protect your privacy.
          </li>
          <li>
            <strong>Reliability and Accessibility:</strong> Decentralized storage on IPFS ensures that your files are always accessible, with redundancy across multiple nodes. Even if some nodes go offline, your data remains available.
          </li>
          <li>
            <strong>Developer-Friendly Integration:</strong> Veltyr provides robust APIs and clear documentation, allowing developers to quickly integrate decentralized storage features into their applications.
          </li>
          <li>
            <strong>Cost-Effective Solution:</strong> By using IPFS as a decentralized infrastructure, Celtyr offers competitive pricing, especially for applications that require large storage capacities without the overhead of centralized data centers.
          </li>
        </ul>
      </section>
    </div>
  );
}
