import Link from 'next/link'

export default function AboutPage() {
  return (
    <section className="space-y-6 pt-20">
      <h1 className="text-4xl font-bold">Hi, I’m Kushagra 👋</h1>
      <p className="text-lg leading-relaxed max-w-2xl">
        I’m a strategist, technologist, and lifelong learner — passionate about turning complex data into simple insights for successful business stories.
        <br />
        <br />
        <span className="font-semibold">Neuronχ²</span> is my digital home for projects, blogs, and all other curiosity-powered things.
      </p>

      <div className="flex flex-wrap gap-4 pt-4">
        <Link
          href="/projects"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          View Projects
        </Link>
        <Link
          href="/expertise"
          className="inline-block px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
        >
          Expertise Overview
        </Link>
        <Link
          href="/contact"
          className="inline-block px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition"
        >
          Contact Me
        </Link>
        <div className="flex flex-wrap gap-2 items-center justify-center">
          <a
            href="/cv/Kush_CV_EN.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition text-center"
          >
            CV in English
          </a>
          <a
            href="/cv/Kush_CV_DE.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition text-center"
          >
            CV in German
          </a>
        </div>
      </div>

      <div className="pt-10 space-y-4 max-w-3xl">
        <h2 className="text-2xl font-semibold">More About Me</h2>

        <p>
          With over 15 years of experience across data, technology, and management, I started my journey as a GE Graduate Programme Fellow (Young Leader) in 2008.
          Since then, I’ve held both individual contributor and leadership roles—driving analytics, financial strategy, and digital innovation across industries.
        </p>

        <h3 className="text-xl font-semibold pt-4">Career Highlights</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>2022–Present:</strong> New Product Development Manager, Morgan Advanced Materials – spearheading strategic, data-driven market expansion.</li>
          <li><strong>2020–2022:</strong> Senior Marketing BI Finance Analyst, HelloFresh – bridging financial, marketing, and BI domains.</li>
          <li><strong>2019–2020:</strong> Data Analysis Consultant (Intern), Ommax – advising SMEs post-masters on digital analytics.</li>
          <li><strong>2015–2018:</strong> Business Analytics Manager, Toluna – led analytics for COO, focused on operations and client delivery.</li>
          <li><strong>2012–2015:</strong>  Project Manager & Senior Financial Analyst, FP&A, Dynata – earlier managed market research project delivery & then moved to CFO&rsquo;s team for financial reporting and sales insights.</li>
          <li><strong>2010–2012:</strong> Associate, Nehra & Associates – advised corporates on debt restructuring and diversification.</li>
          <li><strong>2008–2010:</strong> Assistant Manager, GE Capital – progressed from analytics to Regional Head, AR & Collections.</li>
        </ul>

        <h3 className="text-xl font-semibold pt-4">Education</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>MSc Big Data & Business Analytics</strong> – ESCP, Paris (2019)</li>
          <li><strong>LL.B.</strong> – Chaudhary Charan Singh University (2009)</li>
          <li><strong>PG Diploma in Financial Management</strong> – Infinity Business School (2008)</li>
          <li><strong>B.Sc. (H) Biomedical Sciences</strong> – University of Delhi (2006)</li>
        </ul>

        <h3 className="text-xl font-semibold pt-4">Certifications</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Six Sigma Black Belt</li>
          <li>Data Analytics using Python</li>
          <li>SAP FI/CO Consultant(Financial Accounting & Controlling)</li>
          <li>ITIL 4 (Information Technology Infrastructure Library)</li>
          <li>PRINCE2 (Projects IN Controlled Environments)</li>
          <li>Exec-PGP, Financial Markets – NIFM, Ministry of Finance (India)</li>
        </ul>

        <h3 className="text-xl font-semibold pt-4">Fun Facts & Passions</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Tutored students aged 12 to 15 in math and science—an early taste of mentoring that still continious today.</li>
          <li>2nd place at Paris La Défense Smart City Hackathon – using clustering for public infra planning.</li>
          <li>Winner of L&rsquo;Oréal Innovation Challenge 2019 – improved first-time visitor conversions.</li>
          <li>Captained both the football and badminton teams in college, and also played competitive volleyball. Sports remain a big part of my life—I still play regularly to this day.</li>
          <li>During undergrad years, served as both Treasurer and later President of the Biomedical Society, helping organize seminars, research discussions, and community events.</li>
          <li>Was consistently on the scholar’s list throughout school, earned the Scholar’s Badge from 1998 to 2001 for academic and extracurricular excellence.</li>
          <li>Currently diving deeper into machine learning and generative AI frontiers.</li>
        </ul>
      </div>
    </section>
  )
}
