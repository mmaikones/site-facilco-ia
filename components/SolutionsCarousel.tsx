import React, { useEffect } from 'react';
import Safety from './Safety';
import Weighbridge from './Weighbridge';
import IndustrialProjects from './IndustrialProjects';

import MachineGuarding from './MachineGuarding';
import DockSolutions from './DockSolutions';

const SolutionsCarousel: React.FC = () => {
    const sectionRefs = React.useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;

            sectionRefs.current.forEach((section, index) => {
                if (!section) return;

                const nextSection = sectionRefs.current[index + 1];

                // Defaults
                let opacity = 1;
                let scale = 1;
                let filter = 0;

                if (nextSection) {
                    const nextRect = nextSection.getBoundingClientRect();
                    const nextTop = nextRect.top;

                    // Logic: As the next section goes UP (nextTop decreases),
                    // the current section fades out and scales down.
                    // Range of interest: When nextTop goes from WindowHeight down to 80px.

                    const stickPoint = 80;
                    const distance = windowHeight - stickPoint;
                    const currentPos = Math.max(0, nextTop - stickPoint);

                    // 1.0 when next section is at bottom, 0.0 when next section is at top
                    const progress = Math.min(1, Math.max(0, currentPos / distance));

                    opacity = 0.3 + (0.7 * progress); // Fade to 30%
                    scale = 0.9 + (0.1 * progress);   // Scale to 90%
                    filter = 5 * (1 - progress);      // Blur up to 5px
                }

                // Apply styles directly for performance
                section.style.opacity = opacity.toString();
                section.style.transform = `scale(${scale})`;
                section.style.filter = `blur(${filter}px)`;
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Initial call
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative bg-gray-100">
            {/* Section 1: Safety (Linha de Vida) */}
            <section
                ref={(el) => (sectionRefs.current[0] = el)}
                className="sticky top-[80px] min-h-screen flex flex-col justify-center bg-white rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.08)] z-10 py-20 transition-all ease-out origin-top"
            >
                <div className="container mx-auto px-4">
                    <Safety />
                </div>
            </section>

            {/* Section 2: Weighbridge (Balança) */}
            <section
                ref={(el) => (sectionRefs.current[1] = el)}
                className="sticky top-[80px] min-h-screen flex flex-col justify-center bg-gray-50 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.08)] z-20 py-20 transition-all ease-out origin-top border-t border-gray-100/50"
            >
                <div className="container mx-auto px-4">
                    <Weighbridge />
                </div>
            </section>

            {/* Section 3: Machine Guarding (NR-12) */}
            <section
                ref={(el) => (sectionRefs.current[2] = el)}
                className="sticky top-[80px] min-h-screen flex flex-col justify-center bg-white rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.08)] z-30 py-20 transition-all ease-out origin-top border-t border-gray-100/50"
            >
                <div className="container mx-auto px-4">
                    <MachineGuarding />
                </div>
            </section>

            {/* Section 4: Dock Solutions */}
            <section
                ref={(el) => (sectionRefs.current[3] = el)}
                className="sticky top-[80px] min-h-screen flex flex-col justify-center bg-gray-50 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.08)] z-40 py-20 transition-all ease-out origin-top border-t border-gray-100/50"
            >
                <div className="container mx-auto px-4">
                    <DockSolutions />
                </div>
            </section>

            {/* Section 5: Industrial Projects */}
            <section
                ref={(el) => (sectionRefs.current[4] = el)}
                className="sticky top-[80px] min-h-screen flex flex-col justify-center bg-white rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.08)] z-50 py-20 transition-all ease-out origin-top border-t border-gray-100/50"
            >
                <div className="container mx-auto px-4">
                    <IndustrialProjects />
                </div>
            </section>
        </div>
    );
};

export default SolutionsCarousel;
