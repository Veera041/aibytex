// src/components/TestimonialCard.jsx

export default function TestimonialCard({ name, role, image, review, rating }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">

      {/* Profile */}
      <div className="flex items-center gap-4">
        {/* <img
          src={image}
          alt={name}
          className="w-14 h-14 rounded-full object-cover border border-gray-200"
        /> */}

        <div>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>

      {/* Review */}
      <p className="text-gray-700 mt-4 text-sm leading-relaxed">{review}</p>

      {/* Rating */}
      <div className="flex gap-1 mt-4">
        {Array.from({ length: Math.floor(rating) }).map((_, idx) => (
          <span key={idx} className="text-yellow-500 text-lg">★</span>
        ))}

        {/* Half star logic if rating like 4.5 */}
        {rating % 1 !== 0 && <span className="text-yellow-500 text-lg">★</span>}
      </div>
    </div>
  );
}
