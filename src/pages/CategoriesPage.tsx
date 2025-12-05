import { Grid3x3, Vote, Trophy, Film, Cpu, DollarSign, Cloud, FlaskConical, Briefcase } from 'lucide-react';

const categories = [
  { name: 'Politics', count: 42, color: 'bg-botanical-fern', icon: Vote },
  { name: 'Sports', count: 38, color: 'bg-botanical-moss', icon: Trophy },
  { name: 'Entertainment', count: 25, color: 'bg-botanical-marigold', icon: Film },
  { name: 'Technology', count: 31, color: 'bg-botanical-terracotta', icon: Cpu },
  { name: 'Finance', count: 29, color: 'bg-gradient-to-br from-botanical-fern to-botanical-moss', icon: DollarSign },
  { name: 'Weather', count: 18, color: 'bg-gradient-to-br from-botanical-marigold to-botanical-terracotta', icon: Cloud },
  { name: 'Science', count: 15, color: 'bg-botanical-sage', icon: FlaskConical },
  { name: 'Business', count: 22, color: 'bg-botanical-forest', icon: Briefcase },
];

export const CategoriesPage = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-botanical-bark mb-2">Categories</h1>
        <p className="text-botanical-moss">Browse markets by category</p>
      </div>

      <div className="grid grid-cols-4 gap-5">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <button
              key={category.name}
              className="bg-white hover:bg-botanical-petal border border-botanical-sage/30 hover:border-botanical-fern rounded-2xl p-6 transition-all duration-300 text-left shadow-botanical hover:shadow-botanical-lg group"
            >
              <div className={`w-14 h-14 ${category.color} rounded-xl flex items-center justify-center mb-4 shadow-warm group-hover:scale-105 transition-transform`}>
                <IconComponent className="w-7 h-7 text-botanical-cream" />
              </div>
              <h3 className="text-xl font-display font-bold text-botanical-bark mb-2">{category.name}</h3>
              <p className="text-botanical-moss text-sm">{category.count} markets</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
