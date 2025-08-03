import React from 'react';

const AboutPage = () => {
  return (
    <div className="bg-[#0a0f24] text-white px-6 md:px-20 py-16">
      <h1 className="text-4xl font-bold mb-6 text-center">About Get Me a Coffee</h1>
      <p className="text-base sm:text-lg text-center max-w-4xl mx-auto mb-12">
        Get Me a Coffee is a crowdfunding platform that empowers creators to bring their ideas to life with the support of their fans.
        Whether you're an artist, developer, writer, or musician, this platform lets your audience support you by buying you a coffee — fueling your creativity, one cup at a time.
      </p>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {/* Left Side */}
        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold mb-2">Fans Want to Collaborate 🤝</h2>
            <p className="text-base sm:text-lg">Your fans love being a part of your journey. They’re eager to support your vision and help you succeed.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Benefits for Creators 🎨</h2>
            <ul className="list-disc list-inside space-y-2 text-base sm:text-lg">
              <li>Receive direct financial support from your loyal fans</li>
              <li>Foster stronger relationships with your community</li>
              <li>Launch and sustain passion projects more effectively</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Benefits of Collaboration 🤝</h2>
            <ul className="list-disc list-inside space-y-2 text-base sm:text-lg">
              <li>Partner with fellow creators for unique joint ventures</li>
              <li>Expand your reach through cross-promotion</li>
              <li>Blend diverse skills to craft impactful work</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Access to Resources 📚</h2>
            <ul className="list-disc list-inside space-y-2 text-base sm:text-lg">
              <li>Exclusive tutorials, templates, and tools</li>
              <li>Mentorship from experienced creators</li>
              <li>Insights into the latest creative trends</li>
            </ul>
          </section>
        </div>

        {/* Right Side */}
        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold mb-2">Support Through Coffee ☕</h2>
            <p className="text-base sm:text-lg">Fans can support your work by buying you a coffee — each contribution fuels your next big idea.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Benefits for Fans 💛</h2>
            <ul className="list-disc list-inside space-y-2 text-base sm:text-lg">
              <li>Help creators you admire thrive</li>
              <li>Access exclusive rewards and shout-outs</li>
              <li>Feel part of the journey and creative process</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Community Engagement 🌐</h2>
            <ul className="list-disc list-inside space-y-2 text-base sm:text-lg">
              <li>Join discussions and live events with creators</li>
              <li>Share ideas and feedback within a passionate community</li>
              <li>Build genuine connections with like-minded people</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Recognition & Exposure 📣</h2>
            <ul className="list-disc list-inside space-y-2 text-base sm:text-lg">
              <li>Showcase your work to a global audience</li>
              <li>Be featured in promotional campaigns</li>
              <li>Grow your credibility and creator portfolio</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Supportive Community 🫂</h2>
            <ul className="list-disc list-inside space-y-2 text-base sm:text-lg">
              <li>Inclusive space that embraces diversity and creativity</li>
              <li>Collaborate and learn from fellow creators</li>
              <li>Grow together through mutual support</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
