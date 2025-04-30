import React from 'react';
import { motion } from 'framer-motion';
import { useThemeStore } from '../../store/theme';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories, 
  activeCategory, 
  setActiveCategory 
}) => {
  const { isDark } = useThemeStore();

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {categories.map((category) => (
        <motion.button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`relative px-6 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
            activeCategory === category 
              ? 'text-white' 
              : isDark 
                ? 'text-gray-300 hover:text-primary'
                : 'text-dark hover:text-primary'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {activeCategory === category && (
            <motion.div
              layoutId="categoryIndicator"
              className="absolute inset-0 bg-primary rounded-full z-0"
              transition={{ type: "spring", duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{category}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default CategoryFilter;