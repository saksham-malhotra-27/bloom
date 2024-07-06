"use client"
import React from 'react';
import {Input, Textarea} from "@nextui-org/input";
import {Radio, RadioGroup} from "@nextui-org/radio";

function BlogDescription() {
    return (
        <div className="bg-default-100 rounded-md flex flex-col gap-2 p-2">
            <Input label="Blog title" color="default" variant="bordered" isRequired={true}/>
            <Input label="Blog author" color="default" variant="bordered" isRequired={true}/>
            <RadioGroup
                label="Status"
                className="text-sm border-2 border-default-200 p-2 rounded-xl hover:border-default-400"
                defaultValue="publish"
            >
                <Radio value="publish">Publish</Radio>
                <Radio value="draft">Draft</Radio>
            </RadioGroup>
            <Input label="Blog excerpt" color="default" variant="bordered" isRequired={true} maxLength={100}/>
            <Textarea label="Blog Description" color="default" variant="bordered" isRequired={true} maxLength={500} maxRows={6} />
            <Input label="Tags" color="default" variant="bordered" placeholder="add comma seperated tags"/>
            <Input type="file" label="choose banner image" placeholder="x" className="h-20" variant="bordered" accept="image/*"
                classNames={{ inputWrapper : "h-16"}} isRequired={true}
            />

        </div>
    );
}

export default BlogDescription;