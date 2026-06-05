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
	PC: [
		{
			name: '台式主机 2',
			specs: 'R5 5600x + Geforce GTX 1660 Ti',
			image: '/images/device/2505503-ryzen-5-5600x.png',
			link: 'https://www.amd.com/zh-cn/products/processors/desktops/ryzen/5000-series/amd-ryzen-5-5600x.html',
			description:
				'后来把GTX 970换成了GTX 1660 Ti，R5 5600X的CPU性能刚好让GTX 1660 Ti满载不浪费，6G显存刚好够1080P不爆显存，整机不到300W的功耗落在500W电源的最佳效率区间。没有瓶颈，没有冗余，每分钱和每瓦电都花在了刀刃上。'
		},
		{
			name: '台式主机 3',
			specs: 'R5 5600 + Radeon RX 6650 XT',
			image: '/images/device/cev9x0pj3mLcc.jpg',
			link: 'https://www.amd.com/zh-cn/products/graphics/desktops/radeon/6000-series/amd-radeon-rx-6650-xt.html',
			description:
				'高中时装的第三台机子，前两台没少折腾，这台已经把钱花在了极致的刀刃上。R5 5600配6650 XT，1080P下基本没有跑不动的游戏。120水冷纯属图个好看，毕竟这U百元风冷就能压住。550W电源带这套300W出头的整机绰绰有余，1TB固态随便用。虚幻4跑着色器编译和烘培光照也能扛得住，但16G内存有点不够，有时给我整个引擎干崩，也算高中阶段用过的综合实力较强的一台机子了。'
		},
		{
			name: '台式主机 1',
			specs: 'R5 5600x + Geforce GTX 970',
			image: '/images/device/ryzen-5-5600x.png',
			link: 'https://www.amd.com/zh-cn/products/processors/desktops/ryzen/5000-series/amd-ryzen-5-5600x.html',
			description: '当年自己组的第一台主机，当时显卡溢价严重，显卡先用手里的GTX 970顶着。单塔风冷压5600X绰绰有余，500W电源带这套满载不到350W的平台也很稳。'
		}
	],

	服务器: [
		{
			name: '服务器主机',
			specs: 'R7 7700 + 16G DDR5 5600 + 三星860EVO 500G',
			image: '/images/device/2505503-ryzen-7-7700.png',
			link: 'https://www.amd.com/zh-cn/products/processors/desktops/ryzen/7000-series/amd-ryzen-7-7700.html',
			description:
				'这套跑个人博客和网站，性能严重过剩。R7 7700的8核Zen4单核性能碾压各种轻量应用服务器。内存涨的堪比金条，就用一根16G DDR5 5600绰绰有余，跑个几十个容器不在话下。500G固态做系统盘+数据库完全够用，SG13B小机箱放家里不占地方，整机满载不到150W，电费几乎可以忽略。'
		}
	],

	主机: [
		{
			name: 'Xbox Series S 512G 白',
			specs: '10GB GDDR6 + Zen2 8核心CPU',
			image: '/images/device/1_536.png',
			link: 'https://www.xbox.com/zh-CN/consoles/xbox-series-s',
			description:
				'当初用这台跑地平线5，4 TFLOPS的RDNA2在4K电视上虽然会糊，但在1080P/1440P显示器上开性能模式还是可以稳60帧的，毕竟不到两千块的机器还能说啥呢。Quick Resume切换极快，开了XGP单机随便试错也不心疼。但微软独占确实少得可怜，想玩别的还得跟PS5共享第三方。加上512G硬盘装个地平线5再加两三个单机就满了，删游戏得精打细算。'
		}
	],

	Laptop: [
		{
			name: '机械革命耀世15 Pro',
			specs: 'i7-14650HX + RTX 4060 8G',
			image: '/images/device/cei5G0ZYqLQHE.jpg',
			link: 'https://www.mechrevo.com/cn/products/yao-shi-15-pro',
			description:
				'同价位最能打的轻薄游戏本，i7-14650HX 8大核+8小核，13代桌面下放魔改，单核多核都够猛，140W满血RTX 4060配合2.5K屏，DLSS3加持下可以畅玩几乎所有游戏。重点是1.9kg、19.9mm机身里塞进了这套配置，便携性完胜同级产品。短板是机革的售后网点不如御三家，而且高负载下风噪较大。'
		},
		{
			name: '戴尔游匣G15 5520',
			specs: 'i7-12700H + RTX 3060 6G',
			image: '/images/device/notebook-g-15-5521-gallery-1.png',
			link: 'https://www.dell.com/zh-cn/shop/%E7%AC%94%E8%AE%B0%E6%9C%AC/%E6%B8%B8%E5%8C%A3-g15-intel%E7%89%88-%E6%B8%B8%E6%88%8F%E6%9C%AC/spd/g-series-15-5520-laptop/g15-5520-d1762b',
			description:
				'这配置是2022年水桶机代表。i7-12700H采用大小核架构 6大核+8小核，多核性能碾压同代锐龙，配合140W满血RTX 3060，1080P下几乎通吃所有3A。短板是戴尔祖传的单硬盘位，以及没有直连切换开关，需外接显示器才能绕开核显。'
		}
	],

	IQOO: [
		{
			name: 'IQOO 12',
			specs: '12GB + 256GB',
			image: '/images/device/iqoo12.png',
			link: 'https://www.vivo.com.cn/vivo/param/iqoo12',
			description: '第三代骁龙8移动平台，八核4nm处理器，LPDDR5X 四通道，UFS4.0，120W 超快闪充，2800 × 1260 144HZ，10.7亿色，P3色域。'
		},
		{
			name: 'IQOO Neo5',
			specs: '8GB + 256GB',
			image: '/images/device/iqoo_neo5.webp',
			link: 'https://shop.vivo.com.cn/product/10006278',
			description: '高通骁龙870+独立显示芯片，66W闪充，全覆盖液冷散热，8GB LPDDR4X 四通道，256GB UFS 3.1。'
		}
	]
}
