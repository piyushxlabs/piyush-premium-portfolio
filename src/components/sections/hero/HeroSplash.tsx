import React from "react";

export function HeroSplash() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
            <div className="container relative z-10 mx-auto px-6 py-32 text-center">
                <h1 className="text-5xl sm:text-6xl lg:text-8xl font-heading font-bold flex flex-col items-center gap-y-4">
                    <div className="leading-tight">
                        <span className="text-slate-100">𝓗𝓔𝓨 𝓘 𝓐𝓜 </span>
                        <span className="text-gradient-heading">𝓟𝓘𝓨𝓤𝓢𝓗</span>
                    </div>
                    <span className="text-3xl sm:text-4xl lg:text-6xl text-slate-100 font-normal">
                        𝓦𝓔𝓛𝓒𝓞𝓜𝓔 𝓣𝓞 𝓜𝓨 𝓟𝓞𝓡𝓣𝓕𝓞𝓛𝓘𝓞
                    </span>
                </h1>
            </div>
        </section>
    );
}
