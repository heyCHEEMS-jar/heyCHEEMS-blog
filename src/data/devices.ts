// 设备数据配置文件

export interface Device {
    name: string
    image: string
    specs: string
    description: string
    link: string
}

// 设备类别类型，支持品牌和自定义类别
export type DeviceCategory = Record<string, Device[]> & {
    自定义?: Device[]
}

export const devicesData: DeviceCategory = {
  路由器: [{
    name: 'Xiaomi AX3000T',
    specs: '联发科Filogic 820 双核1.3GHz',
    image: '/images/device/ax3000t.jpg',
    link: 'https://www.mi.com/xiaomi-ax3000t',
    description: 'WIFI6 2.4G/5G双频段 入门级路由器，稳定配置够用。'
  }],

  PC: [{
    name: 'R5 5600x + Geforce GTX 1660 Ti',
    specs: 'R5 5600x + Geforce GTX 1660 Ti',
    image: '/images/device/2505503-ryzen-5-5600x.png',
    link: 'https://www.amd.com/zh-cn/products/processors/desktops/ryzen/5000-series/amd-ryzen-5-5600x.html',
    description: 'CPU：R5 5600X | GPU：GTX 1660 Ti 6G | 显存利用率：1080P满配不溢出 | 整机功耗：<300W'
  }, {
    name: 'R5 5600 + Radeon RX 6650 XT',
    specs: 'R5 5600 + Radeon RX 6650 XT',
    image: '/images/device/cev9x0pj3mLcc.jpg',
    link: 'https://www.amd.com/zh-cn/products/graphics/desktops/radeon/6000-series/amd-radeon-rx-6650-xt.html',
    description: 'CPU：R5 5600 | GPU：RX 6650 XT | 散热：120水冷（纯装饰） | 内存：16G | 硬盘：1TB | 电源：550W带300W出头整机'
  }, {
    name: 'R5 5600x + Geforce GTX 970',
    specs: 'R5 5600x + Geforce GTX 970',
    image: '/images/device/ryzen-5-5600x.png',
    link: 'https://www.amd.com/zh-cn/products/processors/desktops/ryzen/5000-series/amd-ryzen-5-5600x.html',
    description: 'CPU：R5 5600X | 显卡：GTX 970（过渡，当年溢价严重） | 散热：单塔风冷（绰绰有余） | 电源：500W'
  }],

  服务器: [{
    name: 'R7 7700 + 16G DDR5 5600 + 三星860EVO 500G',
    specs: 'R7 7700 + 16G DDR5 5600 + 三星860EVO 500G',
    image: '/images/device/2505503-ryzen-7-7700.png',
    link: 'https://www.amd.com/zh-cn/products/processors/desktops/ryzen/7000-series/amd-ryzen-7-7700.html',
    description: '跑个人网站，CPU：R7 7700（8核Zen4，性能过剩） | 内存：16G DDR5 5600 | 硬盘：500G固态（系统+数据库） | 机箱：SG13B | 功耗：满载<150W'
  }],

  主机: [{
    name: 'Xbox Series S 512G 白',
    specs: '10GB GDDR6 + Zen2 8核心CPU',
    image: '/images/device/1_536.png',
    link: 'https://www.xbox.com/zh-CN/consoles/xbox-series-s',
    description: '4 TFLOPS RDNA2 | 分辨率：1080P/1440P性能模式稳60帧 | 功能：Quick Resume极快，XGP试错成本低 | 短板：微软独占少，512G硬盘装两三个单机就满。'
  }],

  Laptop: [{
    name: '机械革命耀世15 Pro',
    specs: 'i7-14650HX + RTX 4060 8G',
    image: '/images/device/cei5G0ZYqLQHE.jpg',
    link: 'https://www.mechrevo.com/cn/products/yao-shi-15-pro',
    description: '同价位最轻薄的满血4060游戏本，就是风扇吵点。'
  }, {
    name: '戴尔游匣G15 5520',
    specs: 'i7-12700H + RTX 3060 6G',
    image: '/images/device/notebook-g-15-5521-gallery-1.png',
    link: 'https://www.dell.com/zh-cn/shop/%E7%AC%94%E8%AE%B0%E6%9C%AC/%E6%B8%B8%E5%8C%A3-g15-intel%E7%89%88-%E6%B8%B8%E6%88%8F%E6%9C%AC/spd/g-series-15-5520-laptop/g15-5520-d1762b',
    description: '2022年水桶机，12700H+满血3060通吃1080P，可惜单硬盘位+无直连切换。'
  }],

  IQOO: [{
    name: 'IQOO 12',
    specs: '12GB + 256GB',
    image: '/images/device/iqoo12.png',
    link: 'https://www.vivo.com.cn/vivo/param/iqoo12',
    description: '骁龙8 Gen 3 + LPDDR5X + UFS4.0 + 120W闪充 + 1.5K 144Hz高刷屏。'
  }, {
    name: 'IQOO Neo5',
    specs: '8GB + 256GB',
    image: '/images/device/iqoo_neo5.webp',
    link: 'https://shop.vivo.com.cn/product/10006278',
    description: '骁龙870＋独显芯＋66W＋液冷，一代神U配置拉满，可惜内存是LPDDR4X。'
  }]
}
