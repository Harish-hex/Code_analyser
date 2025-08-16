import React from 'react';

const PlatformSelector = ({ platforms, selectedPlatform, onSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {platforms.map((platform) => {
        const IconComponent = platform.icon;
        const isSelected = selectedPlatform?.id === platform.id;
        
        return (
          <button
            key={platform.id}
            onClick={() => onSelect(platform)}
            className={`${
              isSelected 
                ? 'ring-4 ring-primary-400 bg-white/30' 
                : 'bg-white/20 hover:bg-white/30'
            } p-6 rounded-xl transition-all duration-200 transform hover:scale-105 ${
              isSelected ? 'scale-105' : ''
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div className={`${platform.color} p-4 rounded-full mb-4 transition-all`}>
                <IconComponent size={32} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {platform.name}
              </h3>
              {isSelected && (
                <div className="text-primary-300 text-sm font-medium">
                  ✓ Selected
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default PlatformSelector;

