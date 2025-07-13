import React from 'react'

const Footer = () => {
    return (
        <div>

            {/* Privacy Notice
 Affiliates
 Terms of Use
 E-Sign Consent
 Contact Us
 Do Not Sell or Share My Personal Information
 Privacy Preferences
 (866) 455-2066 */}
            <footer className="flex flex-col space-y-10 justify-center m-10">

                <nav className="flex max-w-4xl px-8 mx-auto justify-center flex-wrap gap-x-6 gap-y-2 text-gray-500 font-medium">
                    <a className="text-[#00667f] text-sm" href="#">Privacy Notice</a>
                    <a className="text-[#00667f] text-sm" href="#">Affiliates</a>
                    <a className="text-[#00667f] text-sm" href="#">Terms of Use</a>
                    <a className="text-[#00667f] text-sm" href="#">E-Sign Consent</a>
                    <a className="text-[#00667f] text-sm" href="#">Contact Us</a>
                    <a className="text-[#00667f] text-sm" href="#">Do Not Sell or Share My Personal Information</a>
                    <a className="text-[#00667f] text-sm" href="#">Privacy Preferences</a>
                    <a className="text-[#00667f] text-sm" href="#">(866) 455-2066</a>
                </nav>

                <p className="text-center text-gray-400 text-sm">© 2025 QuinStreet, Inc. All Rights Reserved.</p>
            </footer>
        </div>
    )
}

export default Footer
