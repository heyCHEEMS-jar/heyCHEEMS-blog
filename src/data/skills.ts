// Skill data configuration file
// Used to manage data for the skill display page

export interface Skill {
    id: string
    name: string
    description: string
    icon: string // Iconify icon name
    category: 'frontend' | 'backend' | 'database' | 'tools' | 'other'
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
    experience: {
        years: number
        months: number
    }
    projects?: string[] // Related project IDs
    certifications?: string[]
    color?: string // Skill card theme color
}

export const skillsData: Skill[] = [{
  id: 'git',
  name: 'Git',
  description: '分布式版本控制系统，是代码管理与团队协作不可或缺的工具。',
  icon: 'logos:git-icon',
  category: 'tools',
  level: 'advanced',

  experience: {
    years: 2,
    months: 0
  },

  projects: [],
  certifications: [],
  color: '#F05032'
}, {
  id: 'vscode',
  name: 'VS Code',
  description: '轻量而强大的代码编辑器，插件生态极为丰富。',
  icon: 'logos:visual-studio-code',
  category: 'tools',
  level: 'advanced',

  experience: {
    years: 2,
    months: 0
  },

  projects: [],
  certifications: [],
  color: '#007ACC'
}, {
  id: 'skill-1779771862769',
  name: 'Eclipse IDE',
  description: '一款开源且可扩展的集成开发环境，主要用于 Java 开发，同时借助插件可支持众多其他编程语言。',
  icon: 'devicon:eclipse',
  category: 'tools',
  level: 'intermediate',

  experience: {
    years: 2,
    months: 0
  },

  projects: [],
  certifications: [],
  color: '#4c4270'
}, {
  id: 'linux',
  name: 'Linux',
  description: '一款开源操作系统，深受服务器部署与开发环境的青睐。',
  icon: 'logos:linux-tux',
  category: 'tools',
  level: 'intermediate',

  experience: {
    years: 2,
    months: 0
  },

  projects: [],
  certifications: [],
  color: '#FCC624'
}, {
  id: 'postman',
  name: 'Postman',
  description: '一款 API 开发与测试工具，让 API 的设计、调试及文档编写更加简单高效。',
  icon: 'logos:postman-icon',
  category: 'tools',
  level: 'intermediate',

  experience: {
    years: 1,
    months: 8
  },

  projects: [],
  certifications: [],
  color: '#FF6C37'
}, {
  id: 'nginx',
  name: 'Nginx',
  description: '一款高性能的 Web 服务器与反向代理服务器。',
  icon: 'logos:nginx',
  category: 'tools',
  level: 'intermediate',

  experience: {
    years: 1,
    months: 2
  },

  projects: [],
  certifications: [],
  color: '#009639'
}, {
  id: 'intellij',
  name: 'IntelliJ IDEA',
  description: 'JetBrains 出品的旗舰 IDE，Java 开发的首选利器，智能编码辅助功能极其强大。',
  icon: 'logos:intellij-idea',
  category: 'tools',
  level: 'intermediate',

  experience: {
    years: 1,
    months: 0
  },

  projects: [],
  certifications: [],
  color: '#616161'
}, {
  id: 'docker',
  name: 'Docker',
  description: '一款容器化平台，让应用的部署与环境管理变得简单高效。',
  icon: 'logos:docker-icon',
  category: 'tools',
  level: 'beginner',

  experience: {
    years: 0,
    months: 6
  },

  projects: [],
  certifications: [],
  color: '#2496ED'
}, {
  id: 'pycharm',
  name: 'PyCharm',
  description: 'JetBrains 打造的专业 Python IDE，具备智能代码分析与强大的调试能力。',
  icon: 'logos:pycharm',
  category: 'tools',
  level: 'beginner',

  experience: {
    years: 0,
    months: 3
  },

  projects: [],
  certifications: [],
  color: '#21D789'
}, {
  id: 'skill-1779771184958',
  name: 'Unreal Engine 4',
  description: '一套功能完备的游戏开发工具包，能够打造高质量的 3D 游戏、模拟仿真以及实时渲染画面。',
  icon: 'skill-icons:unrealengine',
  category: 'other',
  level: 'intermediate',

  experience: {
    years: 3,
    months: 6
  },

  projects: [],
  certifications: [],
  color: '#000000'
}, {
  id: 'skill-1779771677688',
  name: 'After Effects',
  description: '一款功能强大的动态图形与视觉特效软件，广泛用于影视级片头制作、动画设计以及视频后期合成。',
  icon: 'logos:adobe-after-effects',
  category: 'other',
  level: 'intermediate',

  experience: {
    years: 2,
    months: 0
  },

  projects: [],
  certifications: [],
  color: '#9999ff'
}, {
  id: 'skill-1779771219064',
  name: 'Unreal Engine 5',
  description: '一款革命性的实时 3D 创作工具，凭借 Nanite 和 Lumen 等领先技术，让开发者能够打造出极致细节、沉浸感十足的游戏与交互体验。',
  icon: 'cib:unreal-engine',
  category: 'other',
  level: 'beginner',

  experience: {
    years: 0,
    months: 6
  },

  projects: [],
  certifications: [],
  color: '#000000'
}, {
  id: 'photoshop',
  name: 'Photoshop',
  description: '一款专业的图像处理与平面设计软件。',
  icon: 'logos:adobe-photoshop',
  category: 'other',
  level: 'beginner',

  experience: {
    years: 0,
    months: 3
  },

  projects: [],
  certifications: [],
  color: '#31A8FF'
}, {
  id: 'sass',
  name: 'Sass/SCSS',
  description: '一款 CSS 预处理器，支持变量、嵌套和混合宏等高级特性，让样式编写更高效。',
  icon: 'logos:sass',
  category: 'frontend',
  level: 'intermediate',

  experience: {
    years: 2,
    months: 0
  },

  projects: [],
  certifications: [],
  color: '#CF649A'
}, {
  id: 'javascript',
  name: 'JavaScript',
  description: '现代 JavaScript 开发，包括 ES6+ 新语法、异步编程及模块化开发等内容。',
  icon: 'logos:javascript',
  category: 'frontend',
  level: 'advanced',

  experience: {
    years: 2,
    months: 0
  },

  projects: [],
  certifications: [],
  color: '#F7DF1E'
}, {
  id: 'vue',
  name: 'Vue.js',
  description: '一款渐进式 JavaScript 框架，上手简单，使用灵活，适合快速开发项目。',
  icon: 'logos:vue',
  category: 'frontend',
  level: 'intermediate',

  experience: {
    years: 1,
    months: 10
  },

  projects: [],
  certifications: [],
  color: '#4FC08D'
}, {
  id: 'typescript',
  name: 'TypeScript',
  description: '一款类型安全的 JavaScript 超集，能有效提高代码质量与开发效率。',
  icon: 'logos:typescript-icon',
  category: 'frontend',
  level: 'intermediate',

  experience: {
    years: 1,
    months: 8
  },

  projects: [],
  certifications: [],
  color: '#3178C6'
}, {
  id: 'react',
  name: 'React',
  description: '一款用于构建用户界面的 JavaScript 库，提供了 Hooks、Context 以及状态管理等功能。',
  icon: 'logos:react',
  category: 'frontend',
  level: 'intermediate',

  experience: {
    years: 1,
    months: 0
  },

  projects: [],
  certifications: [],
  color: '#61DAFB'
}, {
  id: 'vite',
  name: 'Vite',
  description: '一款新一代前端构建工具，冷启动极快，热更新体验流畅。',
  icon: 'logos:vitejs',
  category: 'frontend',
  level: 'intermediate',

  experience: {
    years: 1,
    months: 0
  },

  projects: [],
  certifications: [],
  color: '#646CFF'
}, {
  id: 'webpack',
  name: 'Webpack',
  description: '一款面向现代 JavaScript 应用的静态模块打包工具。',
  icon: 'logos:webpack',
  category: 'frontend',
  level: 'intermediate',

  experience: {
    years: 1,
    months: 0
  },

  projects: [],
  certifications: [],
  color: '#8DD6F9'
}, {
  id: 'tailwindcss',
  name: 'Tailwind CSS',
  description: '一款实用工具优先的 CSS 框架，可帮助你快速构建现代化的用户界面。',
  icon: 'logos:tailwindcss-icon',
  category: 'frontend',
  level: 'intermediate',

  experience: {
    years: 1,
    months: 0
  },

  projects: [],
  certifications: [],
  color: '#06B6D4'
}, {
  id: 'nuxtjs',
  name: 'Nuxt.js',
  description: '一款简洁易用的 Vue.js 框架，支持服务端渲染与静态网站生成。',
  icon: 'logos:nuxt-icon',
  category: 'frontend',
  level: 'beginner',

  experience: {
    years: 0,
    months: 0
  },

  projects: [],
  certifications: [],
  color: '#00DC82'
}, {
  id: 'nextjs',
  name: 'Next.js',
  description: '一款生产环境就绪的 React 框架，支持服务端渲染、静态站点生成与全栈开发。',
  icon: 'logos:nextjs-icon',
  category: 'frontend',
  level: 'beginner',

  experience: {
    years: 0,
    months: 0
  },

  projects: [],
  certifications: [],
  color: '#616161'
}, {
  id: 'angular',
  name: 'Angular',
  description: '谷歌出品的企业级前端框架，提供完整的单页应用开发解决方案。',
  icon: 'logos:angular-icon',
  category: 'frontend',
  level: 'beginner',

  experience: {
    years: 0,
    months: 0
  },

  projects: [],
  certifications: [],
  color: '#DD0031'
}, {
  id: 'astro',
  name: 'Astro',
  description: '一款现代化的静态网站生成器，不仅支持多框架集成，还拥有出色的性能表现。',
  icon: 'logos:astro-icon',
  category: 'frontend',
  level: 'beginner',

  experience: {
    years: 0,
    months: 0
  },

  projects: [],
  certifications: [],
  color: '#FF5D01'
}, {
  id: 'java',
  name: 'Java',
  description: '一门面向企业级应用开发的主流编程语言，具备跨平台与面向对象的特性。',
  icon: 'logos:java',
  category: 'backend',
  level: 'intermediate',

  experience: {
    years: 2,
    months: 0
  },

  projects: [],
  certifications: [],
  color: '#ED8B00'
}, {
  id: 'express',
  name: 'Express.js',
  description: '一款快速且极简的 Node.js Web 应用框架。',
  icon: 'simple-icons:express',
  category: 'backend',
  level: 'intermediate',

  experience: {
    years: 1,
    months: 0
  },

  projects: [],
  certifications: [],
  color: '#616161'
}, {
  id: 'spring',
  name: 'Spring Boot',
  description: 'Java 生态中最为流行的企业级应用开发框架。',
  icon: 'logos:spring-icon',
  category: 'backend',
  level: 'intermediate',

  experience: {
    years: 1,
    months: 0
  },

  projects: [],
  certifications: [],
  color: '#6DB33F'
}, {
  id: 'nodejs',
  name: 'Node.js',
  description: '一款基于 Chrome V8 引擎的 JavaScript 运行环境，专为服务端开发而设计。',
  icon: 'logos:nodejs-icon',
  category: 'backend',
  level: 'intermediate',

  experience: {
    years: 1,
    months: 0
  },

  projects: [],
  certifications: [],
  color: '#339933'
}, {
  id: 'python',
  name: 'Python',
  description: '一门通用型编程语言，可广泛应用于 Web 开发、数据分析、机器学习等众多领域。',
  icon: 'logos:python',
  category: 'backend',
  level: 'beginner',

  experience: {
    years: 0,
    months: 3
  },

  projects: [],
  certifications: [],
  color: '#3776AB'
}, {
  id: 'mongodb',
  name: 'MongoDB',
  description: '一款文档型 NoSQL 数据库，提供灵活的数据模型。',
  icon: 'logos:mongodb-icon',
  category: 'database',
  level: 'intermediate',

  experience: {
    years: 0,
    months: 8
  },

  projects: [],
  certifications: [],
  color: '#47A248'
}, {
  id: 'sqlite',
  name: 'SQLite',
  description: '一款轻量级嵌入式关系型数据库，非常适合移动应用和小型项目使用。',
  icon: 'simple-icons:sqlite',
  category: 'database',
  level: 'beginner',

  experience: {
    years: 0,
    months: 3
  },

  projects: [],
  certifications: [],
  color: '#003B57'
}, {
  id: 'mysql',
  name: 'MySQL',
  description: '全球最流行的开源关系型数据库管理系统，在 Web 应用开发中被广泛采用。',
  icon: 'logos:mysql-icon',
  category: 'database',
  level: 'beginner',

  experience: {
    years: 0,
    months: 0
  },

  projects: [],
  certifications: [],
  color: '#4479A1'
}, {
  id: 'redis',
  name: 'Redis',
  description: '一款基于内存的高性能键值存储系统，能够充当数据库、缓存和消息中间件。',
  icon: 'logos:redis',
  category: 'database',
  level: 'beginner',

  experience: {
    years: 0,
    months: 0
  },

  projects: [],
  certifications: [],
  color: '#DC382D'
}]
