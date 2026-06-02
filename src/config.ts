import type {
    AnnouncementConfig,
    CommentConfig,
    ExpressiveCodeConfig,
    FooterConfig,
    FullscreenWallpaperConfig,
    LicenseConfig,
    MusicPlayerConfig,
    NavBarConfig,
    PermalinkConfig,
    ProfileConfig,
    RandomPostsConfig,
    RelatedPostsConfig,
    SakuraConfig,
    ShareConfig,
    SidebarLayoutConfig,
    SiteConfig
} from './types/config'
import { LinkPreset } from './types/config'

// 移除i18n导入以避免循环依赖

// 定义站点语言
const SITE_LANG = 'zh_CN' // 语言代码，例如：'en', 'zh_CN', 'ja' 等。
const SITE_TIMEZONE = 8 //设置你的网站时区 from -12 to 12 default in UTC+8
export const siteConfig: SiteConfig = {
  title: 'CHEEMS的小窝',
  subtitle: '一个简单的Blog站点',

  // 请替换为你的站点URL，以斜杠结尾
  siteURL: 'http://mizuki.heycheems.top/',

  // 站点开始运行日期，用于站点统计组件计算运行天数
  siteStartDate: '2026-05-25',

  timeZone: SITE_TIMEZONE,
  lang: SITE_LANG,

  themeColor: {
    // 主题色的默认色相，范围从 0 到 360。例如：红色：0，青色：200，蓝绿色：250，粉色：345
    hue: 240,

    // 对访问者隐藏主题色选择器
    fixed: false
  },

  // 特色页面开关配置（关闭未使用的页面有助于提升 SEO，关闭后请记得在 navbarConfig 中移除对应链接）
  featurePages: {
    // 番剧页面开关
    anime: true,

    // 日记页面开关
    diary: true,

    // 友链页面开关
    friends: true,

    // 项目页面开关
    projects: true,

    // 技能页面开关
    skills: true,

    // 时间线页面开关
    timeline: true,

    // 相册页面开关
    albums: true,

    // 设备页面开关
    devices: true
  },

  // 顶栏标题配置
  navbarTitle: {
    // 显示模式："text-icon" 显示图标+文本，"logo" 仅显示Logo
    mode: 'logo',

    // 顶栏标题文本
    text: 'heyCHEEMS',

    // 顶栏标题图标路径，默认使用 public/assets/home/home.webp
    icon: 'assets/home/home.webp',

    // 网站Logo图片路径
    logo: 'assets/home/default-logo.webp'
  },

  // 页面自动缩放配置
  pageScaling: {
    // 是否开启自动缩放
    enable: true,

    // 目标宽度，低于此宽度时开始缩放
    targetWidth: 2000
  },

  bangumi: {
    // 在此处设置你的Bangumi用户ID，可以设置为 "sai" 测试
    userId: '1251435',

    // 是否在开发环境下获取 Bangumi 数据（默认 false），获取前先执行 pnpm build 构建 json 文件
    fetchOnDev: false
  },

  bilibili: {
    // 在此处设置你的Bilibili用户ID (uid)，例如 "1129280784"
    vmid: '305721009',

    // 是否在开发环境下获取 Bilibili 数据（默认 false）
    fetchOnDev: false,

    // 封面图片镜像源（可选，如果需要使用镜像源，例如 "https://images.weserv.nl/?url="）
    coverMirror: '',

    /*是否使用WebP格式（默认 true）
                                                                                                                                                                                                                                    bilibili 观看进度配置说明(可选，如需配置仔细阅读):
                                                                                                                                                                                                                                    1. 本地开发：请在 .env 文件中填写 BILI_SESSDATA=your_SESSDATA
                                                                                                                                                                                                                                    2. 远程构建：请在 GitHub 仓库 Settings -> Secrets 中添加 BILI_SESSDATA
                                                                                                                                                                                                                                    注意：SESSDATA 为账号凭证，为防止泄露，切记不可使用硬编码。
                                                                                                                                                                                                                                    安全提示：如 SESSDATA 已泄露，请打开 B站手机端 —— 我的 —— 设置 —— 安全隐私 —— 登陆设备管理 —— 一键退登，销毁已泄露的账号凭证*/
    useWebp: true
  },

  anime: {
    // 番剧页面模式："bangumi" 使用Bangumi API，"local" 使用本地配置，"bilibili" 使用Bilibili API
    mode: 'bilibili'
  },

  // 文章列表布局配置
  postListLayout: {
    /*默认布局模式："list" 列表模式（单列布局），"grid" 网格模式（双列布局）
                                                                                                                                                                                                                                    注意：如果侧边栏配置启用了"both"双侧边栏，则无法使用文章列表"grid"网格（双列）布局*/
    defaultMode: 'list',

    // 是否允许用户切换布局
    allowSwitch: true,

    // 文章列表页分类导航条配置
    categoryBar: {
      // 是否在文章列表页显示分类导航条
      enable: true
    }
  },

  // 标签样式配置
  tagStyle: {
    // 是否使用新样式（悬停高亮样式）还是旧样式（外框常亮样式）
    useNewStyle: false
  },

  // 壁纸模式配置
  wallpaperMode: {
    // 默认壁纸模式：banner=顶部横幅，fullscreen=全屏壁纸，none=无壁纸
    defaultMode: 'banner',

    /*整体布局方案切换按钮显示设置（默认："desktop"）
                                                                                                                                                                                                                                    "off" = 不显示
                                                                                                                                                                                                                                    "mobile" = 仅在移动端显示
                                                                                                                                                                                                                                    "desktop" = 仅在桌面端显示
                                                                                                                                                                                                                                    "both" = 在所有设备上显示*/
    showModeSwitchOnMobile: 'desktop'
  },

  banner: {
    /*支持单张图片或图片数组，当数组长度 > 1 时自动启用轮播
                                                                                                                                                                                                                                    使用本地横幅图片*/
    src: {
      desktop: [
        '/assets/desktop-banner/1.gif',
        '/assets/desktop-banner/2.gif',
        '/assets/desktop-banner/3.gif',
        '/assets/desktop-banner/4.gif',
        '/assets/desktop-banner/5.gif',
        '/assets/desktop-banner/6.gif',
        '/assets/desktop-banner/7.gif'
      ],

      mobile: [
        '/assets/mobile-banner/1.gif',
        '/assets/mobile-banner/2.gif',
        '/assets/mobile-banner/3.gif',
        '/assets/mobile-banner/4.gif',
        '/assets/mobile-banner/5.gif',
        '/assets/mobile-banner/6.gif',
        '/assets/mobile-banner/7.gif'
      ]
    },

    // 等同于 object-position，仅支持 'top', 'center', 'bottom'。默认为 'center'
    position: 'center',

    carousel: {
      // 为 true 时：为多张图片启用轮播。为 false 时：从数组中随机显示一张图片
      enable: true,

      // 轮播间隔时间（秒）
      interval: 3
    },

    waves: {
      // 是否启用水波纹效果（注意：此功能性能开销较大）
      enable: true,

      // 性能模式：减少动画复杂度(性能提升40%)
      performanceMode: true,

      // 移动端禁用
      mobileDisable: false
    },

    // PicFlow API支持(智能图片API)
    imageApi: {
      // 启用图片API
      enable: false,

      // API地址，返回每行一个图片链接的文本
      url: 'http://domain.com/api_v2.php?format=text&count=4'
    },

    /*这里需要使用PicFlow API的Text返回类型,所以我们需要format=text参数
                                                                                                                                                                                                                                    项目地址:https://github.com/matsuzaka-yuki/PicFlow-API
                                                                                                                                                                                                                                    请自行搭建API*/
    homeText: {
      // 在主页显示自定义文本
      enable: true,

      // 主页横幅主标题
      title: 'CHEEMS的小窝',

      subtitle: ['欢迎来到CHEEMS的小窝~', '没事就爱整点没用的~'],

      typewriter: {
        // 启用副标题打字机效果
        enable: true,

        // 打字速度（毫秒）
        speed: 100,

        // 删除速度（毫秒）
        deleteSpeed: 50,

        // 完全显示后的暂停时间（毫秒）
        pauseTime: 2000
      }
    },

    credit: {
      // 显示横幅图片来源文本
      enable: false,

      // 要显示的来源文本
      text: '',

      // （可选）原始艺术品或艺术家页面的 URL 链接
      url: ''
    },

    navbar: {
      // 导航栏透明模式："semi" 半透明加圆角，"full" 完全透明，"semifull" 动态透明
      transparentMode: 'semifull'
    }
  },

  toc: {
    // 总开关，启用目录功能
    enable: true,

    // 手机端顶部 TOC 按钮
    mobileTop: true,

    // 电脑端右侧边栏 TOC
    desktopSidebar: true,

    // 悬浮 TOC 按钮
    floating: true,

    // 目录深度，1-6，1 表示只显示 h1 标题，2 表示显示 h1 和 h2 标题，依此类推
    depth: 2,

    // 使用日语假名标记（あいうえお...）代替数字，开启后会将 1、2、3... 改为 あ、い、う...
    useJapaneseBadge: true
  },

  // 在文章内容页显示文章封面
  showCoverInContent: true,

  // 启用生成OpenGraph图片功能,注意开启后要渲染很长时间，不建议本地调试的时候开启
  generateOgImages: false,

  favicon: [],

  // 字体配置
  font: {
    /*注意：自定义字体需要在 src/styles/main.css 中引入字体文件
                                                                                                                                                                                                                                    注意：字体子集优化功能目前仅支持 TTF 格式字体,开启后需要在生产环境才能看到效果,在Dev环境下显示的是浏览器默认字体!*/
    asciiFont: {
      /*英文字体 - 优先级最高
                                                                                                                                                                                                                                                                                                                                                      指定为英文字体则无论字体包含多大范围，都只会保留 ASCII 字符子集*/
      fontFamily: 'ZenMaruGothic-Medium',

      fontWeight: '400',
      localFonts: ['ZenMaruGothic-Medium.ttf'],

      // 启用字体子集优化，减少字体文件大小
      enableCompress: true
    },

    cjkFont: {
      // 中日韩字体 - 作为回退字体
      fontFamily: '萝莉体 第二版',

      fontWeight: '500',
      localFonts: ['loli.ttf'],

      // 启用字体子集优化，减少字体文件大小
      enableCompress: true
    }
  },

  // 控制"上次编辑"卡片显示的开关
  showLastModified: true,

  pageProgressBar: {
    // 启用页面顶部进度条
    enable: true,

    // 进度条高度 3px
    height: 3,

    // 动画时长 6s
    duration: 6000
  },

  thirdPartyAnalytics: {
    // 是否启用第三方统计（Microsoft Clarity），默认关闭，启用可能影响 Lighthouse 评分
    enable: false,

    // Clarity 项目 ID
    clarityId: ''
  }
}
export const fullscreenWallpaperConfig: FullscreenWallpaperConfig = {
  // 使用本地横幅图片
  src: {
    desktop: [
      '/assets/desktop-banner/1.gif',
      '/assets/desktop-banner/2.gif',
      '/assets/desktop-banner/3.gif',
      '/assets/desktop-banner/4.gif',
      '/assets/desktop-banner/5.gif',
      '/assets/desktop-banner/6.gif',
      '/assets/desktop-banner/7.gif'
    ],

    mobile: [
      '/assets/mobile-banner/1.gif',
      '/assets/mobile-banner/2.gif',
      '/assets/mobile-banner/3.gif',
      '/assets/mobile-banner/4.gif',
      '/assets/mobile-banner/5.gif',
      '/assets/mobile-banner/6.gif',
      '/assets/mobile-banner/7.gif'
    ]
  },

  // 壁纸位置，等同于 object-position
  position: 'center',

  carousel: {
    // 启用轮播
    enable: true,

    // 轮播间隔时间（秒）
    interval: 5
  },

  // 层级，确保壁纸在背景层
  zIndex: -1,

  // 壁纸透明度
  opacity: 0.8,

  // 背景模糊程度
  blur: 1
}

export const navBarConfig: NavBarConfig = {
  links: [LinkPreset.Home, LinkPreset.Archive, {
    name: 'Links',
    url: '/links/',
    icon: 'material-symbols:link',

    children: [{
      name: 'GitHub',
      icon: 'fa7-brands:github',
      url: 'https://github.com/2126340634',
      external: true
    }, {
      name: 'Bilibili',
      icon: 'fa7-brands:bilibili',
      url: 'https://space.bilibili.com/305721009',
      external: true
    }, {
      name: 'Gitee',
      icon: 'mdi:git',
      url: 'https://gitee.com/heyCHEEMS_jar',
      external: true
    }, {
      name: '掘金',
      icon: 'simple-icons:juejin',
      url: 'https://juejin.cn/user/4308367489378780',
      external: true
    }, {
      name: 'Steam',
      icon: 'mdi:steam',
      url: 'https://steamcommunity.com/profiles/76561199375981521',
      external: true
    }]
  }, {
    name: 'My',
    url: '/content/',
    icon: 'material-symbols:person',

    children: [{
      name: 'Anime',
      url: '/anime/',
      icon: 'material-symbols:movie'
    }, {
      name: 'Diary',
      url: '/diary/',
      icon: 'material-symbols:book'
    }, {
      name: 'Gallery',
      url: '/albums/',
      icon: 'material-symbols:photo-library'
    }, {
      name: 'Devices',
      url: '/devices/',
      icon: 'material-symbols:devices',
      external: false
    }]
  }, {
    name: 'About',
    url: '/content/',
    icon: 'material-symbols:info',

    children: [{
      name: 'About',
      url: '/about/',
      icon: 'material-symbols:person'
    }, {
      name: 'Friends',
      url: '/friends/',
      icon: 'material-symbols:group'
    }]
  }, {
    name: 'Others',
    url: '#',
    icon: 'material-symbols:more-horiz',

    children: [{
      name: 'Projects',
      url: '/projects/',
      icon: 'material-symbols:work'
    }, {
      name: 'Skills',
      url: '/skills/',
      icon: 'material-symbols:psychology'
    }, {
      name: 'Timeline',
      url: '/timeline/',
      icon: 'material-symbols:timeline'
    }]
  }]
}

export const profileConfig: ProfileConfig = {
  // 相对于 /src 目录。如果以 '/' 开头，则相对于 /public 目录
  avatar: 'http://mizuki-manager.heycheems.top/images/albums/Avatar/CHEEMS.jpg',

  name: 'heyCHEEMS',
  bio: 'EL PSY CONGROO 欢迎来到CHEEMS的小窝~',

  typewriter: {
    // 启用个人简介打字机效果
    enable: true,

    // 打字速度（毫秒）
    speed: 80
  },

  links: [{
    name: 'Bilibili',
    icon: 'fa7-brands:bilibili',
    url: 'https://space.bilibili.com/305721009'
  }, {
    name: 'Gitee',
    icon: 'mdi:git',
    url: 'https://gitee.com/heyCHEEMS_jar'
  }, {
    name: 'GitHub',
    icon: 'fa7-brands:github',
    url: 'https://github.com/2126340634'
  }, {
    name: '掘金',
    icon: 'simple-icons:juejin',
    url: 'https://juejin.cn/user/4308367489378780'
  }, {
    name: 'Steam',
    icon: 'mdi:steam',
    url: 'https://steamcommunity.com/profiles/76561199375981521'
  }]
}

export const licenseConfig: LicenseConfig = {
  enable: true,
  name: 'CC BY-NC-SA 4.0',
  url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/'
}

// Permalink 固定链接配置
export const permalinkConfig: PermalinkConfig = {
  // 是否启用全局 permalink 功能，关闭时使用默认的文件名作为链接
  enable: false,

  /**
                                                                                                                       * permalink 格式模板
                                                                                                                       * 支持的占位符：
                                                                                                                       * - %year% : 4位年份 (2024)
                                                                                                                       * - %monthnum% : 2位月份 (01-12)
                                                                                                                       * - %day% : 2位日期 (01-31)
                                                                                                                       * - %hour% : 2位小时 (00-23)
                                                                                                                       * - %minute% : 2位分钟 (00-59)
                                                                                                                       * - %second% : 2位秒数 (00-59)
                                                                                                                       * - %post_id% : 文章序号（按发布时间升序排列，最早的文章为1）
                                                                                                                       * - %postname% : 文章文件名（slug，通常为全小写）
                                                                                                                       * - %raw_postname% : 文章原始文件名（保留大小写）
                                                                                                                       * - %category% : 分类名（无分类时为 "uncategorized"）
                                                                                                                       *
                                                                                                                       * 示例：
                                                                                                                       * - "%year%-%monthnum%-%postname%" => "/2024-12-my-post/"
                                                                                                                       * - "%post_id%-%postname%" => "/42-my-post/"
                                                                                                                       * - "%category%-%postname%" => "/tech-my-post/"
                                                                                                                       * - "%year%/%monthnum%/%day%/%postname%" => "/2024/12/01/my-post/"
                                                                                                                       *
                                                                                                                       * 注意：支持使用斜杠 "/" 构建嵌套路径。
                                                                                                                  默认使用文件名*/
  format: '%postname%'
}

export const expressiveCodeConfig: ExpressiveCodeConfig = {
  /*注意：某些样式（如背景颜色）已被覆盖，请参阅 astro.config.mjs 文件。
                                                                                                                  请选择深色主题，因为此博客主题目前仅支持深色背景*/
  theme: 'github-dark',

  // 是否在主题切换时隐藏代码块以避免卡顿问题
  hideDuringThemeTransition: true
}

export const commentConfig: CommentConfig = {
  // 启用评论功能。当设置为 false 时，评论组件将不会显示在文章区域。
  enable: false,

  // 评论系统选择: "twikoo" | "giscus"
  system: 'twikoo',

  twikoo: {
    envId: 'https://twikoo.vercel.app',
    lang: SITE_LANG
  },

  giscus: {
    repo: 'your-github-username/your-repo-name',
    repoId: 'your-repo-id',
    category: 'Announcements',
    categoryId: 'your-category-id',
    mapping: 'pathname',
    strict: '0',
    reactionsEnabled: '1',
    emitMetadata: '0',
    inputPosition: 'top',
    theme: 'preferred_color_scheme',
    lang: SITE_LANG,
    loading: 'lazy'
  }
}

export const shareConfig: ShareConfig = {
  // 启用分享功能
  enable: true
}

export const announcementConfig: AnnouncementConfig = {
  // 公告标题，填空使用i18n字符串Key.announcement
  title: '',

  // 公告内容
  content: '泥嚎',

  // 允许用户关闭公告
  closable: false,

  link: {
    // 启用链接
    enable: false,

    // 链接文本
    text: '了解更多',

    // 链接 URL
    url: '/about/',

    // 内部链接
    external: false
  }
}

export const musicPlayerConfig: MusicPlayerConfig = {
  // 启用音乐播放器功能
  enable: true,

  // 显示悬浮播放器 UI
  showFloatingPlayer: true,

  // 悬浮入口模式："default" 为独立悬浮播放器，"fab" 为集成到通用 FAB 组
  floatingEntryMode: 'fab',

  // 音乐播放器模式，可选 "local" 或 "meting"
  mode: 'local',

  // Meting API 地址
  meting_api: '',

  // 歌单ID
  id: '17422419752',

  // 音乐源服务器。有的meting的api源支持更多平台,一般来说,netease=网易云音乐, tencent=QQ音乐, kugou=酷狗音乐, xiami=虾米音乐, baidu=百度音乐
  server: 'netease',

  // 播单类型
  type: 'playlist'
}

export const footerConfig: FooterConfig = {
  // 是否启用Footer HTML注入功能
  enable: true,

  /*HTML格式的自定义页脚信息，例如备案号等，默认留空
                                                                                                                  也可以直接编辑 FooterConfig.html 文件来添加备案号等自定义内容
                                                                                                                  注意：若 customHtml 不为空，则使用 customHtml 中的内容；若 customHtml 留空，则使用 FooterConfig.html 文件中的内容
                                                                                                                  FooterConfig.html 可能会在未来的某个版本弃用*/
  customHtml: '闽ICP备2026018056号-1 | 闽公网安备35080202351548号'
}

/**
 * 侧边栏布局配置
 * 用于控制侧边栏组件的显示、排序、动画和响应式行为
 * sidebar: 控制组件所在的侧边栏（left 或 right）。注意：移动端通常不显示右侧栏内容。若组件设置在 right，请确保 layout.position 为 "both"。
 */
export const sidebarLayoutConfig: SidebarLayoutConfig = {
  properties: [{
    type: 'profile',
    position: 'top',
    class: 'onload-animation',
    animationDelay: 0
  }, {
    type: 'announcement',
    position: 'top',
    class: 'onload-animation',
    animationDelay: 50
  }, {
    type: 'music-sidebar',
    position: 'sticky',
    class: 'onload-animation',
    animationDelay: 100
  }, {
    type: 'categories',
    position: 'sticky',
    class: 'onload-animation',
    animationDelay: 150,

    responsive: {
      collapseThreshold: 5
    }
  }, {
    type: 'tags',
    position: 'top',
    class: 'onload-animation',
    animationDelay: 250,

    responsive: {
      collapseThreshold: 20
    }
  }, {
    type: 'card-toc',
    position: 'sticky',
    class: 'onload-animation',
    animationDelay: 200
  }, {
    type: 'site-stats',
    position: 'top',
    class: 'onload-animation',
    animationDelay: 200
  }, {
    type: 'calendar',
    position: 'top',
    class: 'onload-animation',
    animationDelay: 250
  }],

  // 侧栏组件布局配置
  components: {
    left: ['profile', 'announcement', 'tags', 'card-toc'],
    right: ['site-stats', 'calendar', 'categories', 'music-sidebar'],
    drawer: ['profile', 'announcement', 'music-sidebar', 'categories', 'tags']
  },

  // 默认动画配置
  defaultAnimation: {
    // 是否启用默认动画
    enable: true,

    // 基础延迟时间（毫秒）
    baseDelay: 0,

    // 递增延迟时间（毫秒），每个组件依次增加的延迟
    increment: 50
  },

  // 响应式布局配置
  responsive: {
    // 断点配置（像素值）
    breakpoints: {
      // 移动端断点：屏幕宽度小于768px
      mobile: 768,

      // 平板端断点：屏幕宽度小于1280px
      tablet: 1280,

      // 桌面端断点：屏幕宽度大于等于1280px
      desktop: 1280
    }
  }
}

export const sakuraConfig: SakuraConfig = {
  // 默认关闭樱花特效
  enable: true,

  // 樱花数量
  sakuraNum: 8,

  // 樱花越界限制次数，-1为无限循环
  limitTimes: -1,

  size: {
    // 樱花最小尺寸倍数
    min: 0.5,

    // 樱花最大尺寸倍数
    max: 1.1
  },

  opacity: {
    // 樱花最小不透明度
    min: 0.3,

    // 樱花最大不透明度
    max: 0.9
  },

  speed: {
    horizontal: {
      // 水平移动速度最小值
      min: -1.7,

      // 水平移动速度最大值
      max: -1.2
    },

    vertical: {
      // 垂直移动速度最小值
      min: 1.5,

      // 垂直移动速度最大值
      max: 2.2
    },

    // 旋转速度
    rotation: 0.03,

    // 消失速度，不应大于最小不透明度
    fadeSpeed: 0.03
  },

  // 层级，确保樱花在合适的层级显示
  zIndex: -1
}

// Pio 看板娘配置
export const pioConfig: import('./types/config').PioConfig = {
  // 禁用看板娘以提升性能
  enable: true,

  models: ['/pio/models/pio/model.json'],

  // 模型位置
  position: 'left',

  // 默认宽度
  width: 280,

  // 默认高度
  height: 250,

  // 默认为可拖拽模式
  mode: 'fixed',

  // 默认在移动设备上隐藏
  hiddenOnMobile: true,

  dialog: {
    // 欢迎词
    welcome: '欢迎来到 CHEEMS 的小窝~',

    touch: ['你在干嘛！？', '没事别碰我！', '走开哇！', '不要欺负我！'],

    // 首页提示
    home: '点击这里去首页！',

    skin: ['要看看我的新装扮吗？', '这身打扮真好看！'],

    // 关闭提示
    close: 'QWQ 下次再见~',

    // 关于链接
    link: '/about/'
  }
}

// 相关文章配置
export const relatedPostsConfig: RelatedPostsConfig = {
  enable: true,
  maxCount: 5
}

// 随机文章配置
export const randomPostsConfig: RandomPostsConfig = {
  enable: true,
  maxCount: 5
}

// 导出所有配置的统一接口
export const widgetConfigs = {}

// umamiConfig相关配置已移动至astro.config.mjs中,统计脚本请自行在Layout.astro文件的<head>中插入
