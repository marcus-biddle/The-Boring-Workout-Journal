import React from 'react'

interface BentoGridProps {
  mainTopLeft: React.ReactNode;
  mainTopRight: React.ReactNode;
  bottomSecondaryLeft: React.ReactNode;
  bottomSecondaryMid: React.ReactNode;
  bottomSecondaryRight: React.ReactNode;
}

export const BentoGrid = ({
mainTopLeft,
mainTopRight,
bottomSecondaryLeft,
bottomSecondaryMid,
bottomSecondaryRight
}: BentoGridProps) => {
  return (
    <section className="grid grid-rows-[auto_auto] gap-4">
          {/* First Row */}
          <div className="grid grid-cols-12 gap-4 max-h-[500px]">
            {/* Left side - Deployment list */}
            <div className="col-span-7 bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
              {mainTopLeft}
            </div>
            
            {/* Right side - Apps grid */}
            <div className="col-span-5 bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            {mainTopRight}
            </div>
          </div>
          
          {/* Second Row */}
          <div className="grid grid-cols-12 gap-4">
            {/* Left side - Team avatars and stats */}
            <div className="col-span-5 bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            {bottomSecondaryLeft}
            </div>
            
            {/* Right side - Two feature cards */}
            <div className="col-span-7 grid grid-cols-2 gap-4">
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
              {bottomSecondaryMid}
              </div>

              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
              {bottomSecondaryRight}
              </div>
            </div>
          </div>
        </section>
  )
}
