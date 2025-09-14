// src/pages/Home.jsx

import { Calendar } from "../components/Calendar";
import { EmptyProgramState } from "../components/EmptyProgramState";
import FriendsList from "../components/FriendsList";

// import { useStore } from '../state/store'; // Zustand or chosen state lib

export const Home = () => {
//   const user = useStore(s => s.user);
//   const program = useStore(s => s.activeProgram);
//   const recentWorkouts = useStore(s => s.recentWorkouts);
//   const friends = useStore(s => s.friendsOnline);

  return (
    <>
      <>
        
        {/* Two Row Bento Grid */}
        <div className="grid grid-rows-[auto_auto] gap-4">
          
          {/* First Row */}
          <div className="grid grid-cols-12 gap-4 max-h-[500px]">
            {/* Left side - Deployment list */}
            <div className="col-span-7 bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
              <div className="flex items-center justify-between mb-6">
                <div className="text-slate-400 text-sm">Programs • Updated 1m 32s ago</div>
              </div>
              <EmptyProgramState />
              <>
                
                {/* Deployment Item 1 */}
                {/* <div className="flex items-center justify-between p-4 bg-slate-800/80 rounded-lg border border-slate-700/30">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <div>
                      <div className="text-white font-medium">Planetaria / mobile-api</div>
                      <div className="text-slate-400 text-sm">Deploys from GitHub • Deployed 3m ago • 23s</div>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full border border-blue-600/30">
                    Staging
                  </div>
                </div> */}

                {/* Deployment Item 2 */}
                {/* <div className="flex items-center justify-between p-4 bg-slate-800/80 rounded-lg border border-slate-700/30">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                    <div>
                      <div className="text-white font-medium">Tailwind Labs / tailwindcss.com</div>
                      <div className="text-slate-400 text-sm">Deploys from GitHub • Initiated 5m 49s ago • 3m 4s</div>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-slate-600/20 text-slate-400 text-xs rounded-full border border-slate-600/30">
                    Preview
                  </div>
                </div> */}

                {/* Deployment Item 3 */}
                {/* <div className="flex items-center justify-between p-4 bg-slate-800/80 rounded-lg border border-slate-700/30">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <div>
                      <div className="text-white font-medium">Tailwind Labs / tailwindui.com</div>
                      <div className="text-slate-400 text-sm">Deploys from GitHub • Initiated 8m ago • 1m 30s</div>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-slate-600/20 text-slate-400 text-xs rounded-full border border-slate-600/30">
                    Preview
                  </div>
                </div> */}
              </>
            </div>
            
            {/* Right side - Apps grid */}
            <div className="col-span-5 bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                <Calendar />
              {/* <div className="grid grid-cols-2 gap-4 h-full">
                <div className="flex flex-col items-center justify-center space-y-2 bg-slate-800/80 rounded-lg border border-slate-700/30">
                  <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white text-sm font-bold">G</div>
                  <span className="text-slate-300 text-sm">Gmail</span>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2 bg-slate-800/80 rounded-lg border border-slate-700/30">
                  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-sm font-bold">M</div>
                  <span className="text-slate-300 text-sm">Microsoft Team</span>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2 bg-slate-800/80 rounded-lg border border-slate-700/30">
                  <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-sm font-bold">G</div>
                  <span className="text-slate-300 text-sm">Google Calendar</span>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2 bg-slate-800/80 rounded-lg border border-slate-700/30">
                  <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white text-sm font-bold">D</div>
                  <span className="text-slate-300 text-sm">Discord</span>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2 bg-slate-800/80 rounded-lg border border-slate-700/30">
                  <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center text-white text-sm font-bold">S</div>
                  <span className="text-slate-300 text-sm">Slack</span>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2 bg-slate-800/80 rounded-lg border border-slate-700/30">
                  <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white text-sm font-bold">A</div>
                  <span className="text-slate-300 text-sm">Adobe Creative</span>
                </div>
              </div> */}
            </div>
          </div>
          
          {/* Second Row */}
          <div className="grid grid-cols-12 gap-4">
            {/* Left side - Team avatars and stats */}
            <div className="col-span-5 bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                <div className="mb-4">
                  <div className="text-slate-400 text-sm mb-2">Gym Buddies</div>
                  <h3 className="text-white text-lg font-semibold mb-3">Stalk Your Friends Activities</h3>
                </div>
                <FriendsList />
            </div>
            
            {/* Right side - Two feature cards */}
            <div className="col-span-7 grid grid-cols-2 gap-4">
              {/* Security card */}
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                <div className="mb-4">
                  <div className="text-slate-400 text-sm mb-2">Security</div>
                  <h3 className="text-white text-lg font-semibold mb-3">Advanced access control</h3>
                  <p className="text-slate-400 text-sm">
                    Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia.
                  </p>
                </div>
              </div>

              {/* Performance card */}
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                <div className="mb-4">
                  <div className="text-slate-400 text-sm mb-2">Performance</div>
                  <h3 className="text-white text-lg font-semibold mb-3">Lightning-fast builds</h3>
                  <p className="text-slate-400 text-sm">
                    Sed congue eros non finibus molestie. Vestibulum euismod augue vel commodo vulputate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
