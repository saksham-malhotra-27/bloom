import React from 'react';
import {poppins, roboto} from "@/utils/fonts";
import TeamCard from "@/components/TeamCard";

function OurMission() {
    return (
        <div className="flex flex-col md:flex-row">
            <div className="md:basis-3/4 flex flex-col items-center px-6 md:px-24 mt-4">
                <h1 className="text-3xl">Our Mission</h1>
                <div className={roboto.className}>
                    <h2 className={`text-xl mt-4 py-4`}>At {" "}
                        <span className="bg-primary/50 px-2 rounded-md">Bloom</span>
                        {" "}, we are dedicated to {" "}
                        <span className="bg-primary/50 px-2 rounded-md"> empowering individuals</span>
                        {" "}to achieve greater well-being and live their most {" "}
                        <span className="bg-primary/50 px-2 rounded-md">fulfilling lives</span>. We {" "}
                        believe that everyone has the
                        potential for growth and positive change, and we strive to create a {" "}
                        <span className="bg-primary/50 px-2 rounded-md">safe and supportive</span> {" "}
                        space where
                        you can explore your challenges, {" "}
                        <span className="bg-primary/60 px-2 rounded-md">develop healthy coping mechanisms</span> {" "}
                        ,and build resilience.
                    </h2>

                    <h2 className="text-xl">
                        We are on a mission to <span
                        className="bg-primary/60 px-2 rounded-md">break down barriers to mental healthcare</span> and
                        empower individuals to find
                        the perfect therapist for their unique needs. We believe that everyone deserves access to
                        <span className="bg-primary/60 px-2 rounded-md"> quality mental health services </span>, and we
                        strive to create a welcoming and informative space where
                        you can explore a diverse range of qualified therapists.
                    </h2>

                    <h2 className="text-xl mt-4">
                        <span className="font-semibold">Accessibility</span> - We are committed to making mental
                        healthcare accessible by providing a
                        user-friendly platform and showcasing therapists with a variety of specialties and insurance
                        options. <br/>
                        <span className="font-semibold">Choice</span> - We empower you to choose the therapist who best
                        fits your personality, preferences, and
                        therapeutic goals. <br/>
                        <span className="font-semibold">Transparency</span> - We ensure clear and comprehensive profiles
                        for each therapist, allowing you to
                        make informed decisions. <br/>
                        <span className="font-semibold">Support</span> - We provide guidance and resources throughout
                        your search, fostering a sense of
                        empowerment on your mental health journey. <br/>
                    </h2>

                    <h2 className="text-xl mt-8 bg-primary/10 rounded-md px-2">
                        We believe that therapy is a journey of self-discovery and empowerment. We are here to walk
                        beside you every step of the way.
                    </h2>


                </div>
            </div>
            <div className="md:basis-1/4 bg-zinc-200 m-2 rounded-md p-3 flex flex-col items-center">
                <h1 className="text-3xl mb-4">Our Team</h1>

                <TeamCard name="Saksham Malhotra" university="Amity University, Noida" image="/saksham.png"/>
                <div className="mt-4"></div>
                <TeamCard name="Manav Mahesh Sanger" university="Amity University, Noida" image="/manav.png"/>
            </div>
        </div>
    );
}

export default OurMission;