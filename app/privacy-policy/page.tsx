"use client"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center text-amber-800 hover:text-amber-900 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-serif mb-8 text-center">Privacy Policy</h1>

          <p className="text-neutral-700 mb-8">Last Updated: April 7, 2025</p>

          <h2 className="text-2xl font-serif mb-6">Introduction</h2>
          <p className="text-neutral-700 mb-4">
            At <span className="font-serif italic">umber</span>, we respect your privacy and are committed to protecting
            your personal data. This privacy policy will inform you about how we look after your personal data when you
            visit our website and tell you about your privacy rights and how the law protects you.
          </p>
          <p className="text-neutral-700 mb-8">Please read this privacy policy carefully before using our services.</p>

          <h2 className="text-2xl font-serif mb-6">Information We Collect</h2>
          <p className="text-neutral-700 mb-4">
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped
            together as follows:
          </p>
          <ul className="list-disc pl-6 text-neutral-700 mb-8">
            <li className="mb-2">Identity Data includes first name, last name, username or similar identifier.</li>
            <li className="mb-2">Contact Data includes email address and telephone numbers.</li>
            <li className="mb-2">
              Technical Data includes internet protocol (IP) address, browser type and version, time zone setting and
              location, browser plug-in types and versions, operating system and platform.
            </li>
            <li className="mb-2">Usage Data includes information about how you use our website and services.</li>
            <li>
              Marketing and Communications Data includes your preferences in receiving marketing from us and our third
              parties and your communication preferences.
            </li>
          </ul>

          <h2 className="text-2xl font-serif mb-6">How We Use Your Information</h2>
          <p className="text-neutral-700 mb-4">
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data
            in the following circumstances:
          </p>
          <ul className="list-disc pl-6 text-neutral-700 mb-8">
            <li className="mb-2">To register you as a new customer.</li>
            <li className="mb-2">To process and deliver your order.</li>
            <li className="mb-2">To manage our relationship with you.</li>
            <li className="mb-2">To improve our website, products/services, marketing or customer relationships.</li>
            <li>To recommend products or services which may be of interest to you.</li>
          </ul>

          <h2 className="text-2xl font-serif mb-6">Cookies</h2>
          <p className="text-neutral-700 mb-4">
            We use cookies and similar tracking technologies to track the activity on our service and hold certain
            information. Cookies are files with small amount of data which may include an anonymous unique identifier.
          </p>
          <p className="text-neutral-700 mb-8">
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if
            you do not accept cookies, you may not be able to use some portions of our service.
          </p>

          <h2 className="text-2xl font-serif mb-6">Data Security</h2>
          <p className="text-neutral-700 mb-8">
            We have put in place appropriate security measures to prevent your personal data from being accidentally
            lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your
            personal data to those employees, agents, contractors and other third parties who have a business need to
            know.
          </p>

          <h2 className="text-2xl font-serif mb-6">Your Legal Rights</h2>
          <p className="text-neutral-700 mb-4">
            Under certain circumstances, you have rights under data protection laws in relation to your personal data,
            including the right to:
          </p>
          <ul className="list-disc pl-6 text-neutral-700 mb-8">
            <li className="mb-2">Request access to your personal data.</li>
            <li className="mb-2">Request correction of your personal data.</li>
            <li className="mb-2">Request erasure of your personal data.</li>
            <li className="mb-2">Object to processing of your personal data.</li>
            <li className="mb-2">Request restriction of processing your personal data.</li>
            <li>Request transfer of your personal data.</li>
          </ul>

          <h2 className="text-2xl font-serif mb-6">Changes to This Privacy Policy</h2>
          <p className="text-neutral-700 mb-8">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy.
          </p>

          <h2 className="text-2xl font-serif mb-6">Contact Us</h2>
          <p className="text-neutral-700 mb-8">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <div className="text-neutral-700 mb-8">
            <p>By email: privacy@umber.com</p>
            <p>By phone: (555) 123-4567</p>
            <p>By mail: 123 Coffee Street, New York, NY 10001</p>
          </div>

          <div className="text-center text-neutral-700 italic border-t border-b py-8 my-8">
            "At <span className="font-serif">umber</span>, we value your privacy as much as we value the quality of our
            coffee."
          </div>
        </div>
      </div>
    </div>
  )
}

