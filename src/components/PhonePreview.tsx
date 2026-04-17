import React from 'react';
import { cn } from '@/src/lib/utils';
import { Battery, Wifi, SignalHigh } from 'lucide-react';

interface PhonePreviewProps {
  children: React.ReactNode;
  className?: string;
}

export function PhonePreview({ children, className }: PhonePreviewProps) {
  return (
    <div className={cn("relative mx-auto border-gray-800 bg-gray-800 border-[8px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl flex flex-col overflow-hidden", className)}>
      {/* Notch */}
      <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-50">
        <div className="w-32 h-6 bg-gray-800 rounded-b-2xl"></div>
      </div>
      
      {/* Status Bar (Simulated) */}
      <div className="h-7 w-full bg-transparent absolute top-0 z-40 flex justify-between items-center px-4 pt-1 pointer-events-none text-black">
        <span className="text-[10px] font-medium pl-1">9:41</span>
        <div className="flex items-center gap-1">
          <SignalHigh className="w-3 h-3" />
          <Wifi className="w-3 h-3" />
          <Battery className="w-4 h-4" />
        </div>
      </div>

      {/* Screen Content - This is where the simulated Flutter app goes */}
      <div className="bg-white flex-1 w-full h-full relative overflow-hidden pt-7">
        {children}
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-gray-300 rounded-full z-50"></div>
    </div>
  );
}

{/* Common Flutter UI Components simulated in Tailwind */}
export function FlutterAppBar({ title, color = "bg-blue-500", centerTitle = false }: { title: string, color?: string, centerTitle?: boolean }) {
  return (
    <div className={cn("w-full h-14 flex items-center px-4 shadow-sm z-30 relative shrink-0", color)}>
      <h1 className={cn("text-white font-medium text-lg", centerTitle && "mx-auto")}>{title}</h1>
    </div>
  );
}

export function FlutterScaffold({ children, appBar, backgroundColor = "bg-gray-50" }: { children: React.ReactNode, appBar?: React.ReactNode, backgroundColor?: string }) {
  return (
    <div className={cn("w-full h-full flex flex-col", backgroundColor)}>
      {appBar}
      <div className="flex-1 overflow-y-auto relative flex flex-col">
        {children}
      </div>
    </div>
  );
}

export function FlutterFloatingActionButton({ onClick, icon: Icon, color = "bg-blue-500" }: { onClick?: () => void, icon: any, color?: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn("absolute bottom-6 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white active:scale-95 transition-transform z-40", color)}
    >
      <Icon className="w-6 h-6" />
    </button>
  );
}
