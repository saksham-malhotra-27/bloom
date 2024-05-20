import React from 'react';
import {Card, CardBody, CardHeader} from "@nextui-org/card";
import Image from "next/image";

function TeamCard({name, university, image }: {name: string, university: string, image: string}) {
    return (
        <Card className="py-1 bg-zinc-300 backdrop-blur-3xl rounded-md" isBlurred={true} shadow="md">
            {/*<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">*/}
            {/*    <p className="text-tiny uppercase font-bold">Daily Mix</p>*/}
            {/*    <small className="text-default-500">12 Tracks</small>*/}
            {/*    <h4 className="font-bold text-large">Frontend Radio</h4>*/}
            {/*</CardHeader>*/}
            <CardBody className="overflow-visible py-2 flex flex-col items-center justify-center">
                <div className="bg-stone-200 rounded-md">
                    <Image
                        alt="Card background"
                        className="object-cover rounded-xl"
                        src={image}
                        width={200} height="200"
                    />
                </div>
                <p className="text-base">{name}</p>
                <p className="text-xs">{university}</p>
            </CardBody>
        </Card>
    );
}

export default TeamCard;