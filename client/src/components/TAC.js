import * as React from "react"
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const TaC = () => {
    const navigate = useNavigate()

    return (
        <div>
            <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#FF5D5D" />
                <meta name="description" content="Truth Burst is a online multiplayer game to play with freinds" />
                <meta name="keywords" content="Truth Burst, truth burst, truth, games, online games, online multiplayer games, multiplayer games, multiplayer party games, party games, multiplayer game, truth burst live, Truth Burst Live, games to play with friends" />
                <meta name="author" content="Shivang Mishra" />
            </Helmet>

            <main className="flex flex-col w-5/6 justify-center items-center lg:max-w-screen-md mx-auto">
                <h1 className="text-center text-white text-4xl my-4 mt-8">
                    Terms and Conditions
                </h1>

                <section className="bg-white rounded-xl shadow-bottom border-ui flex flex-col text-black text-left px-8 py-8">
                    <p className="mb-4">
                        Truth Burst Live website is run by{" "}
                        <a
                            className="text-black font-semibold"
                            target="_blank" rel="noreferrer"
                            href="https://www.shivangmishra.me"
                        >
                            Shivang Mishra
                        </a>
                    </p>
                    <p className="mb-4">
                        You can contact us on{" "}
                        <a
                            className="text-black font-semibold"
                            href="mailto:support@truthburst.live"
                        >
                            support@truthburst.live
                        </a>
                        .
                    </p>
                    <p className="mb-4">
                        When you subscribe to our newsletter, we will send you
                        an occasional email to let you know about the newest
                        features and other news related to Truth Brust Live
                        website.
                    </p>
                    <p className="mb-4">
                        We respect your privacy and won't share your information
                        with anyone, nor will we send you any unrelated emails.
                    </p>
                    {/* <p className="mb-4">
                        We use Mailchimp as our marketing platform. By
                        subscribing to our newsletter, you acknowledge that your
                        information will be transferred to Mailchimp for
                        processing. Learn more about Mailchimp's{" "}
                        <a
                            className="text-blue underline"
                            target="_blank" rel="noreferrer"
                            href="https://mailchimp.com/legal/"
                        >
                            privacy practices
                        </a>{" "}
                        and a{" "}
                        <a
                            className="text-blue underline"
                            target="_blank" rel="noreferrer"
                            href="https://mailchimp.com/gdpr/"
                        >
                            GDPR compliance
                        </a>
                        .
                    </p> */}
                    <p className="mb-4">
                        You can unsubscribe at any time by clicking the link in
                        the footer of our emails, or you can contact us on{" "}
                        <a
                            className="text-black font-semibold"
                            href="mailto:support@truthburst.live"
                        >
                            support@truthburst.live
                        </a>
                        .
                    </p>

                    <div className="focus:outline-none bg-[#FF5D5D] text-center w-1/2 mx-auto transition duration-150 ease-in-out hover:bg-[#fb5656] rounded text-white px-8 py-3 text-sm leading-6 cursor-pointer">
                        <button
                            onClick={() => {
                                navigate("/")
                            }}
                        >
                            Close
                        </button>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default TaC