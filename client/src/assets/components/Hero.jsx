import React, { useState } from 'react'
import SplitText from '../../blocks/TextAnimations/SplitText/SplitText';
import GradientText from '../../blocks/TextAnimations/GradientText/GradientText'
import ShinyText from '../../blocks/TextAnimations/ShinyText/ShinyText';

const Hero = () => {
    const [phone, setPhone] = useState('');
    const token = import.meta.env.VITE_AUTH_TOKEN; // from .env

    const handleChange = (e) => {
        const value = e.target.value;
        if (/^\d{0,10}$/.test(value)) {
            setPhone(value);
        }
    };

    const handleAnimationComplete = () => {
        console.log('All letters have animated!');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPhone('')

        if (phone.length !== 10) {
            alert("Please enter a valid 10-digit number.");
            return;
        }

        try {
            alert("Request sumbitted you will recieve a call in few seconds!")
            await fetch("https://backend.omnidim.io/api/v1/calls/dispatch", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    agent_id: 2318,
                    to_number: `+91${phone}`
                })
            });
            console.log("✅ Call dispatched");
        } catch (err) {
            console.error("❌ Error dispatching call:", err.message);
        }
    };

    return (
        <div className='px-10 flex flex-col justify-center gap-3 items-center'>

            <GradientText
                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                animationSpeed={3}
                showBorder={false}
                className="custom-class text-3xl text-center md:text-5xl"
            >
                JanSamadhan
            </GradientText>

            <SplitText
                text="An AI voice assistant to manage civic"
                className="text-xl md:text-2xl font-semibold text-center wrap-normal"
                delay={100}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
                onLetterAnimationComplete={handleAnimationComplete}
            />

            <SplitText
                text="Issue Suggestion Emergency!"
                className="text-2xl md:text-3xl font-semibold text-center"
                delay={1500}
                duration={1}
                ease="power3.out"
                splitType="words"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
                onLetterAnimationComplete={handleAnimationComplete}
            />
            <div className='button-gradient'>
                <form onSubmit={handleSubmit} className='flex flex-col md:flex-row justify-between items-center'>
                    <input
                        type="tel"
                        inputMode="numeric"
                        pattern="\d{10}"
                        maxLength={10}
                        placeholder="Enter 10-digit mobile number"
                        value={phone}
                        onChange={handleChange} 
                        className='focus:outline-none text-sm text-center'/>
                    <button type='submit' className='cursor-pointer'>
                        <ShinyText text="Submit!" disabled={false} speed={2} className='custom-class text-xl' />
                    </button>
                </form>
            </div>
            <span className='text-sm text-gray-500'>Your personal information is never stored*</span>    
        </div>
    )
}

export default Hero
