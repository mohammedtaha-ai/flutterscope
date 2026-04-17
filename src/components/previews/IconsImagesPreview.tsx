import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';
import { Heart, Star, Cloud, Sun } from 'lucide-react';

export function IconsImagesPreview() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'icon' | 'image'>('icon');
  const [selectedIcon, setSelectedIcon] = useState('favorite');
  const [selectedImage, setSelectedImage] = useState('network');

  const icons: Record<string, React.ReactNode> = {
    'favorite': <Heart className="w-16 h-16 text-red-500 fill-current" />,
    'star': <Star className="w-16 h-16 text-yellow-400 fill-current" />,
    'cloud': <Cloud className="w-16 h-16 text-blue-400 fill-current" />,
    'sunny': <Sun className="w-16 h-16 text-orange-400 fill-current" />,
  };

  const dartCodeIcon = `
import 'package:flutter/material.dart';

class MyIconApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Icon(
      Icons.${selectedIcon},
      size: 64.0,
      color: Colors.blue,
    );
  }
}
`;

  const dartCodeImage = `
import 'package:flutter/material.dart';

class MyImageApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Image.${selectedImage === 'network' ? 'network' : 'asset'}(
      ${selectedImage === 'network' ? "'https://picsum.photos/300/200'" : "'assets/my_image.png'"},
      width: 300,
      height: 200,
      fit: BoxFit.cover,
    );
  }
}
`;

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="flex-1 space-y-8">
        <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-6">
          <div className="flex gap-4 border-b pb-2">
            <button 
              onClick={() => setActiveTab('icon')}
              className={`font-semibold pb-2 border-b-2 transition-colors \${activeTab === 'icon' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
            >
              Icons
            </button>
            <button 
              onClick={() => setActiveTab('image')}
              className={`font-semibold pb-2 border-b-2 transition-colors \${activeTab === 'image' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
            >
              Images
            </button>
          </div>
          
          {activeTab === 'icon' ? (
            <div className="grid grid-cols-4 gap-2">
              {Object.keys(icons).map((k) => (
                <button
                  key={k}
                  onClick={() => setSelectedIcon(k)}
                  className={`py-3 text-sm font-mono rounded border transition-colors flex flex-col items-center gap-2 \${selectedIcon === k ? 'bg-blue-50 border-blue-400 text-blue-800' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}
                >
                  <span className="text-gray-400 scale-50 -my-2">{icons[k]}</span>
                  {k}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={selectedImage === 'network'} onChange={() => setSelectedImage('network')} className="w-4 h-4 text-blue-600" />
                <span>Image.network</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={selectedImage === 'asset'} onChange={() => setSelectedImage('asset')} className="w-4 h-4 text-blue-600" />
                <span>Image.asset</span>
              </label>
            </div>
          )}
        </div>

        <CodeView code={activeTab === 'icon' ? dartCodeIcon : dartCodeImage} />
      </div>

      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <FlutterScaffold appBar={<FlutterAppBar title={activeTab === 'icon' ? "Icons" : "Images"} />}>
            <div className="flex-1 bg-white flex items-center justify-center p-4">
              {activeTab === 'icon' ? (
                <div className="animate-bounce-short">
                  {icons[selectedIcon]}
                </div>
              ) : (
                <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 mx-4 max-w-full">
                  <img 
                    src={selectedImage === 'network' ? "https://picsum.photos/seed/flutterscope/300/200" : "https://picsum.photos/seed/asset/300/200"} 
                    alt="Sample" 
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover block"
                  />
                </div>
              )}
            </div>
          </FlutterScaffold>
        </PhonePreview>
      </div>
    </div>
  );
}
