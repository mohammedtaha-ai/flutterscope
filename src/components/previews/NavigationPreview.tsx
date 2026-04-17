import React, { useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft } from 'lucide-react';

export function NavigationPreview() {
  const [screen, setScreen] = useState(1);

  const dartCode = screen === 1 ? `
import 'package:flutter/material.dart';

class ScreenOne extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Screen 1')),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            // Push ScreenTwo onto the stack!
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => ScreenTwo()),
            );
          },
          child: Text('Push Screen 2'),
        ),
      ),
    );
  }
}
` : `
import 'package:flutter/material.dart';

class ScreenTwo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Screen 2')),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            // Pop ScreenTwo off the stack!
            Navigator.pop(context);
          },
          child: Text('Pop / Go Back'),
        ),
      ),
    );
  }
}
`;

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="flex-1 space-y-8">
         <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
          <h3 className="font-bold text-lg">Navigator Stack</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Flutter uses a Stack for navigation. <code>Navigator.push()</code> adds a new screen to the top of the stack. <code>Navigator.pop()</code> removes the current screen, revealing the one underneath.
          </p>
          <div className="flex gap-2 items-center mt-4 text-xs font-mono bg-gray-100 p-2 rounded">
             <span className="font-bold">Stack:</span> [Screen 1 {screen === 2 && ', Screen 2'}]
          </div>
        </div>
        <CodeView code={dartCode} />
      </div>

      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <div className="relative w-full h-full bg-black overflow-hidden flex flex-col">
            <div className="w-full h-6 bg-blue-700 shrink-0" />
            
            <div className="relative flex-1">
              <AnimatePresence initial={false}>
                {screen === 1 && (
                  <motion.div 
                    key="screen1"
                    initial={{ x: '-30%', opacity: 0.5 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: '-30%', opacity: 0.5 }}
                    transition={{ type: "tween", duration: 0.3 }}
                    className="absolute inset-0 bg-white flex flex-col shadow-2xl"
                  >
                    <div className="h-14 bg-blue-500 text-white flex items-center px-4 font-medium text-lg shadow-sm z-10 shrink-0">
                      Screen 1
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <button 
                        onClick={() => setScreen(2)}
                        className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded shadow hover:bg-blue-700 transition"
                      >
                        Push Screen 2
                      </button>
                    </div>
                  </motion.div>
                )}
                {screen === 2 && (
                  <motion.div 
                    key="screen2"
                    initial={{ x: '100%', boxShadow: '-10px 0 20px rgba(0,0,0,0.2)' }}
                    animate={{ x: 0, boxShadow: '-10px 0 20px rgba(0,0,0,0.2)' }}
                    exit={{ x: '100%', boxShadow: '-10px 0 20px rgba(0,0,0,0.2)' }}
                    transition={{ type: "tween", duration: 0.3 }}
                    className="absolute inset-0 bg-white flex flex-col z-10"
                  >
                    <div className="h-14 bg-blue-500 text-white flex items-center px-1 font-medium text-lg shadow-sm z-10 shrink-0">
                      <button onClick={() => setScreen(1)} className="p-2 hover:bg-blue-600 rounded-full mr-2 transition">
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      Screen 2
                    </div>
                    <div className="flex-1 flex items-center justify-center bg-gray-50 text-center px-4">
                      <div className="space-y-6">
                        <button 
                          onClick={() => setScreen(1)}
                          className="px-6 py-2.5 bg-gray-800 text-white font-medium rounded shadow hover:bg-gray-900 transition"
                        >
                          Pop / Go Back
                        </button>
                        <p className="text-xs text-gray-400 max-w-[200px] mx-auto">Notice the back arrow in the AppBar? Flutter adds that automatically when you push a route!</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </PhonePreview>
      </div>
    </div>
  );
}
