export function AboutUsComponent() {
  return (
    <>
      <section className="w-full bg-white py-20 px-6 lg:px-20">
        <div className="mx-auto max-w-3xl text-center flex flex-col gap-6">
          {/* Label */}
          <span className="text-sm uppercase tracking-widest text-gray-500">
            About Us
          </span>

          {/* Heading */}
          <h2
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-3xl sm:text-4xl font-extrabold text-gray-900"
          >
            Style Begins with the Details
          </h2>

          {/* Story */}
          <p
            style={{ fontFamily: "ui-serif" }}
            className="text-base sm:text-lg leading-relaxed text-gray-700"
          >
            We believe true style isn’t loud — it’s intentional. Born from a
            passion for craftsmanship and modern design, our brand creates men’s
            accessories that complement confidence, character, and everyday
            life.
          </p>

          <p
            style={{ fontFamily: "ui-serif" }}
            className="text-base sm:text-lg leading-relaxed text-gray-700"
          >
            Every piece is thoughtfully designed using premium materials,
            balancing comfort with timeless elegance — because the right details
            don’t just complete an outfit, they define the man wearing it.
          </p>

          {/* CTA */}
          <button
            onClick={() => (window.location.href = "/about")}
            className="mx-auto mt-4 px-8 py-3 text-sm font-medium tracking-wide text-white bg-black rounded-full hover:scale-105 transition"
          >
            Our Story
          </button>
        </div>
      </section>
    </>
  );
}
