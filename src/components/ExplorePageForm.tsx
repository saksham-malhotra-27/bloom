"use client"
import React from 'react';
import {getTherapists} from "@/actions/getTherapist";
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/button";
import {Select, SelectItem} from "@nextui-org/select";

function ExplorePageForm() {
    return (
        <div className="bg-default-200/50 rounded-xl p-3 flex flex-col justify-center items-center gap-3 mt-5">
            <h2 className="text-black text-xl">Filter By</h2>
            <form action={getTherapists} className=' flex flex-col gap-2 rounded-md w-full px-3'>

                <Input className='rounded-md' name='sessionCost' type='text' label="Session Cost" variant="bordered"/>
                <Select name='sessionMode' className='rounded-md' label='Session mode' variant="bordered">
                    <SelectItem key="online" value="online">Online</SelectItem>
                    <SelectItem key="in person" value="in person">In person</SelectItem>
                </Select>
                <Input name='meetDuration' className='rounded-md' type="text" label='Meet duration (in mins)' variant="bordered"/>
                <Input name='experience' className='rounded-md' type='text' label='Experience' variant="bordered"/>
                <Select name='stars' className='rounded-md' label='Rating (in stars)' variant="bordered">
                    <SelectItem key="3" value="3">3</SelectItem>
                    <SelectItem key="4" value="4">4</SelectItem>
                    <SelectItem key="5" value="5">5</SelectItem>
                </Select>
                <Button type='submit' color="primary" className="mt-4" size="lg">
                    Submit
                </Button>
            </form>
        </div>
    );
}

export default ExplorePageForm;