let List = (function() {
  let REGION_LIST = [{
    id: '10',
    text: '中国',
    children: [{
      id: '80',
      text: '华北地区',
      children: [{
        id: '11',
        text: '北京'
      }, {
        id: '12',
        text: '天津'
      }, {
        id: '13',
        text: '河北',
        children: [{
          id: '1306',
          text: '保定市'
        }, {
          id: '1309',
          text: '沧州市'
        }, {
          id: '1308',
          text: '承德市'
        }, {
          id: '1304',
          text: '邯郸市'
        }, {
          id: '1311',
          text: '衡水市'
        }, {
          id: '1310',
          text: '廊坊市'
        }, {
          id: '1303',
          text: '秦皇岛市'
        }, {
          id: '1301',
          text: '石家庄市'
        }, {
          id: '1302',
          text: '唐山市'
        }, {
          id: '1305',
          text: '邢台市'
        }, {
          id: '1307',
          text: '张家口市'
        }]
      }, {
        id: '14',
        text: '山西',
        children: [{
          id: '1402',
          text: '大同市'
        }, {
          id: '1405',
          text: '晋城市'
        }, {
          id: '1407',
          text: '晋中市'
        }, {
          id: '1410',
          text: '临汾市'
        }, {
          id: '1411',
          text: '吕梁市'
        }, {
          id: '1406',
          text: '朔州市'
        }, {
          id: '1401',
          text: '太原市'
        }, {
          id: '1409',
          text: '忻州市'
        }, {
          id: '1403',
          text: '阳泉市'
        }, {
          id: '1408',
          text: '运城市'
        }, {
          id: '1404',
          text: '长治市'
        }]
      }, {
        id: '15',
        text: '内蒙古',
        children: [{
          id: '1529',
          text: '阿拉善盟'
        }, {
          id: '1508',
          text: '巴彦淖尔市'
        }, {
          id: '1502',
          text: '包头市'
        }, {
          id: '1504',
          text: '赤峰市'
        }, {
          id: '1506',
          text: '鄂尔多斯市'
        }, {
          id: '1501',
          text: '呼和浩特市'
        }, {
          id: '1507',
          text: '呼伦贝尔市'
        }, {
          id: '1505',
          text: '通辽市'
        }, {
          id: '1503',
          text: '乌海市'
        }, {
          id: '1509',
          text: '乌兰察布市'
        }, {
          id: '1525',
          text: '锡林郭勒盟'
        }, {
          id: '1522',
          text: '兴安盟'
        }]
      }]
    }, {
      id: '81',
      text: '东北地区',
      children: [{
        id: '21',
        text: '辽宁',
        children: [{
          id: '2103',
          text: '鞍山市'
        }, {
          id: '2105',
          text: '本溪市'
        }, {
          id: '2113',
          text: '朝阳市'
        }, {
          id: '2102',
          text: '大连市'
        }, {
          id: '2106',
          text: '丹东市'
        }, {
          id: '2104',
          text: '抚顺市'
        }, {
          id: '2109',
          text: '阜新市'
        }, {
          id: '2114',
          text: '葫芦岛市'
        }, {
          id: '2107',
          text: '锦州市'
        }, {
          id: '2110',
          text: '辽阳市'
        }, {
          id: '2111',
          text: '盘锦市'
        }, {
          id: '2101',
          text: '沈阳市'
        }, {
          id: '2112',
          text: '铁岭市'
        }, {
          id: '2108',
          text: '营口市'
        }]
      }, {
        id: '22',
        text: '吉林',
        children: [{
          id: '2208',
          text: '白城市'
        }, {
          id: '2206',
          text: '白山市'
        }, {
          id: '2202',
          text: '吉林市'
        }, {
          id: '2204',
          text: '辽源市'
        }, {
          id: '2203',
          text: '四平市'
        }, {
          id: '2207',
          text: '松原市'
        }, {
          id: '2205',
          text: '通化市'
        }, {
          id: '2224',
          text: '延边朝鲜族自治州'
        }, {
          id: '2201',
          text: '长春市'
        }]
      }, {
        id: '23',
        text: '黑龙江',
        children: [{
          id: '2306',
          text: '大庆市'
        }, {
          id: '2327',
          text: '大兴安岭地区'
        }, {
          id: '2301',
          text: '哈尔滨市'
        }, {
          id: '2304',
          text: '鹤岗市'
        }, {
          id: '2311',
          text: '黑河市'
        }, {
          id: '2303',
          text: '鸡西市'
        }, {
          id: '2308',
          text: '佳木斯市'
        }, {
          id: '2310',
          text: '牡丹江市'
        }, {
          id: '2309',
          text: '七台河市'
        }, {
          id: '2302',
          text: '齐齐哈尔市'
        }, {
          id: '2305',
          text: '双鸭山市'
        }, {
          id: '2312',
          text: '绥化市'
        }, {
          id: '2307',
          text: '伊春市'
        }]
      }]
    }, {
      id: '82',
      text: '华东地区',
      children: [{
        id: '31',
        text: '上海'
      }, {
        id: '32',
        text: '江苏',
        children: [{
          id: '3204',
          text: '常州市'
        }, {
          id: '3208',
          text: '淮安市'
        }, {
          id: '3207',
          text: '连云港市'
        }, {
          id: '3201',
          text: '南京市'
        }, {
          id: '3206',
          text: '南通市'
        }, {
          id: '3205',
          text: '苏州市'
        }, {
          id: '3212',
          text: '泰州市'
        }, {
          id: '3202',
          text: '无锡市'
        }, {
          id: '3213',
          text: '宿迁市'
        }, {
          id: '3203',
          text: '徐州市'
        }, {
          id: '3209',
          text: '盐城市'
        }, {
          id: '3210',
          text: '扬州市'
        }, {
          id: '3211',
          text: '镇江市'
        }]
      }, {
        id: '33',
        text: '浙江',
        children: [{
          id: '3301',
          text: '杭州市'
        }, {
          id: '3305',
          text: '湖州市'
        }, {
          id: '3304',
          text: '嘉兴市'
        }, {
          id: '3307',
          text: '金华市'
        }, {
          id: '3311',
          text: '丽水市'
        }, {
          id: '3302',
          text: '宁波市'
        }, {
          id: '3308',
          text: '衢州市'
        }, {
          id: '3306',
          text: '绍兴市'
        }, {
          id: '3310',
          text: '台州市'
        }, {
          id: '3303',
          text: '温州市'
        }, {
          id: '3309',
          text: '舟山市'
        }]
      }, {
        id: '34',
        text: '安徽',
        children: [{
          id: '3408',
          text: '安庆市'
        }, {
          id: '3403',
          text: '蚌埠市'
        }, {
          id: '3416',
          text: '亳州市'
        }, {
          id: '3417',
          text: '池州市'
        }, {
          id: '3411',
          text: '滁州市'
        }, {
          id: '3412',
          text: '阜阳市'
        }, {
          id: '3401',
          text: '合肥市'
        }, {
          id: '3406',
          text: '淮北市'
        }, {
          id: '3404',
          text: '淮南市'
        }, {
          id: '3410',
          text: '黄山市'
        }, {
          id: '3415',
          text: '六安市'
        }, {
          id: '3405',
          text: '马鞍山市'
        }, {
          id: '3407',
          text: '铜陵市'
        }, {
          id: '3402',
          text: '芜湖市'
        }, {
          id: '3413',
          text: '宿州市'
        }, {
          id: '3418',
          text: '宣城市'
        }]
      }, {
        id: '35',
        text: '福建',
        children: [{
          id: '3501',
          text: '福州市'
        }, {
          id: '3508',
          text: '龙岩市'
        }, {
          id: '3507',
          text: '南平市'
        }, {
          id: '3509',
          text: '宁德市'
        }, {
          id: '3503',
          text: '莆田市'
        }, {
          id: '3505',
          text: '泉州市'
        }, {
          id: '3504',
          text: '三明市'
        }, {
          id: '3502',
          text: '厦门市'
        }, {
          id: '3506',
          text: '漳州市'
        }]
      }, {
        id: '36',
        text: '江西',
        children: [{
          id: '3610',
          text: '抚州市'
        }, {
          id: '3607',
          text: '赣州市'
        }, {
          id: '3608',
          text: '吉安市'
        }, {
          id: '3602',
          text: '景德镇市'
        }, {
          id: '3604',
          text: '九江市'
        }, {
          id: '3601',
          text: '南昌市'
        }, {
          id: '3603',
          text: '萍乡市'
        }, {
          id: '3611',
          text: '上饶市'
        }, {
          id: '3605',
          text: '新余市'
        }, {
          id: '3609',
          text: '宜春市'
        }, {
          id: '3606',
          text: '鹰潭市'
        }]
      }, {
        id: '37',
        text: '山东',
        children: [{
          id: '3716',
          text: '滨州市'
        }, {
          id: '3714',
          text: '德州市'
        }, {
          id: '3705',
          text: '东营市'
        }, {
          id: '3717',
          text: '菏泽市'
        }, {
          id: '3701',
          text: '济南市'
        }, {
          id: '3708',
          text: '济宁市'
        }, {
          id: '3712',
          text: '莱芜市'
        }, {
          id: '3715',
          text: '聊城市'
        }, {
          id: '3713',
          text: '临沂市'
        }, {
          id: '3702',
          text: '青岛市'
        }, {
          id: '3711',
          text: '日照市'
        }, {
          id: '3709',
          text: '泰安市'
        }, {
          id: '3710',
          text: '威海市'
        }, {
          id: '3707',
          text: '潍坊市'
        }, {
          id: '3706',
          text: '烟台市'
        }, {
          id: '3704',
          text: '枣庄市'
        }, {
          id: '3703',
          text: '淄博市'
        }]
      }]
    }, {
      id: '83',
      text: '华中地区',
      children: [{
        id: '41',
        text: '河南',
        children: [{
          id: '4105',
          text: '安阳市'
        }, {
          id: '4106',
          text: '鹤壁市'
        }, {
          id: '4108',
          text: '焦作市'
        }, {
          id: '4102',
          text: '开封市'
        }, {
          id: '4111',
          text: '漯河市'
        }, {
          id: '4103',
          text: '洛阳市'
        }, {
          id: '4113',
          text: '南阳市'
        }, {
          id: '4104',
          text: '平顶山市'
        }, {
          id: '4109',
          text: '濮阳市'
        }, {
          id: '4112',
          text: '三门峡市'
        }, {
          id: '4114',
          text: '商丘市'
        }, {
          id: '4107',
          text: '新乡市'
        }, {
          id: '4115',
          text: '信阳市'
        }, {
          id: '4110',
          text: '许昌市'
        }, {
          id: '4101',
          text: '郑州市'
        }, {
          id: '4116',
          text: '周口市'
        }, {
          id: '4117',
          text: '驻马店市'
        }, {
          id: '4190',
          text: '省直辖'
        }]
      }, {
        id: '42',
        text: '湖北',
        children: [{
          id: '4207',
          text: '鄂州市'
        }, {
          id: '4211',
          text: '黄冈市'
        }, {
          id: '4202',
          text: '黄石市'
        }, {
          id: '4208',
          text: '荆门市'
        }, {
          id: '4210',
          text: '荆州市'
        }, {
          id: '4203',
          text: '十堰市'
        }, {
          id: '4213',
          text: '随州市'
        }, {
          id: '4201',
          text: '武汉市'
        }, {
          id: '4212',
          text: '咸宁市'
        }, {
          id: '4206',
          text: '襄阳市'
        }, {
          id: '4209',
          text: '孝感市'
        }, {
          id: '4205',
          text: '宜昌市'
        }, {
          id: '4228',
          text: '恩施土家族苗族自治州'
        }, {
          id: '4290',
          text: '省直辖市'
        }]
      }, {
        id: '43',
        text: '湖南',
        children: [{
          id: '4307',
          text: '常德市'
        }, {
          id: '4310',
          text: '郴州市'
        }, {
          id: '4304',
          text: '衡阳市'
        }, {
          id: '4312',
          text: '怀化市'
        }, {
          id: '4313',
          text: '娄底市'
        }, {
          id: '4305',
          text: '邵阳市'
        }, {
          id: '4303',
          text: '湘潭市'
        }, {
          id: '4331',
          text: '湘西土家族苗族自治州'
        }, {
          id: '4309',
          text: '益阳市'
        }, {
          id: '4311',
          text: '永州市'
        }, {
          id: '4306',
          text: '岳阳市'
        }, {
          id: '4308',
          text: '张家界市'
        }, {
          id: '4301',
          text: '长沙市'
        }, {
          id: '4302',
          text: '株洲市'
        }]
      }]
    }, {
      id: '84',
      text: '华南地区',
      children: [{
        id: '44',
        text: '广东',
        children: [{
          id: '4451',
          text: '潮州市'
        }, {
          id: '4419',
          text: '东莞市'
        }, {
          id: '4406',
          text: '佛山市'
        }, {
          id: '4401',
          text: '广州市'
        }, {
          id: '4416',
          text: '河源市'
        }, {
          id: '4413',
          text: '惠州市'
        }, {
          id: '4407',
          text: '江门市'
        }, {
          id: '4452',
          text: '揭阳市'
        }, {
          id: '4409',
          text: '茂名市'
        }, {
          id: '4414',
          text: '梅州市'
        }, {
          id: '4418',
          text: '清远市'
        }, {
          id: '4405',
          text: '汕头市'
        }, {
          id: '4415',
          text: '汕尾市'
        }, {
          id: '4402',
          text: '韶关市'
        }, {
          id: '4403',
          text: '深圳市'
        }, {
          id: '4417',
          text: '阳江市'
        }, {
          id: '4453',
          text: '云浮市'
        }, {
          id: '4408',
          text: '湛江市'
        }, {
          id: '4412',
          text: '肇庆市'
        }, {
          id: '4420',
          text: '中山市'
        }, {
          id: '4404',
          text: '珠海市'
        }]
      }, {
        id: '45',
        text: '广西',
        children: [{
          id: '4510',
          text: '百色市'
        }, {
          id: '4505',
          text: '北海市'
        }, {
          id: '4514',
          text: '崇左市'
        }, {
          id: '4506',
          text: '防城港市'
        }, {
          id: '4508',
          text: '贵港市'
        }, {
          id: '4503',
          text: '桂林市'
        }, {
          id: '4512',
          text: '河池市'
        }, {
          id: '4511',
          text: '贺州市'
        }, {
          id: '4513',
          text: '来宾市'
        }, {
          id: '4502',
          text: '柳州市'
        }, {
          id: '4501',
          text: '南宁市'
        }, {
          id: '4507',
          text: '钦州市'
        }, {
          id: '4504',
          text: '梧州市'
        }, {
          id: '4509',
          text: '玉林市'
        }]
      }, {
        id: '46',
        text: '海南',
        children: [{
          id: '4601',
          text: '海口市'
        }, {
          id: '4602',
          text: '三亚市'
        }, {
          id: '4603',
          text: '三沙市'
        }, {
          id: '4604',
          text: '儋州市'
        }, {
          id: '4690',
          text: '省直辖'
        }]
      }]
    }, {
      id: '85',
      text: '西南地区',
      children: [{
        id: '50',
        text: '重庆'
      }, {
        id: '51',
        text: '四川',
        children: [{
          id: '5132',
          text: '阿坝藏族羌族自治州'
        }, {
          id: '5119',
          text: '巴中市'
        }, {
          id: '5101',
          text: '成都市'
        }, {
          id: '5117',
          text: '达州市'
        }, {
          id: '5106',
          text: '德阳市'
        }, {
          id: '5133',
          text: '甘孜藏族自治州'
        }, {
          id: '5116',
          text: '广安市'
        }, {
          id: '5108',
          text: '广元市'
        }, {
          id: '5111',
          text: '乐山市'
        }, {
          id: '5134',
          text: '凉山彝族自治州'
        }, {
          id: '5105',
          text: '泸州市'
        }, {
          id: '5114',
          text: '眉山市'
        }, {
          id: '5107',
          text: '绵阳市'
        }, {
          id: '5113',
          text: '南充市'
        }, {
          id: '5110',
          text: '内江市'
        }, {
          id: '5104',
          text: '攀枝花市'
        }, {
          id: '5109',
          text: '遂宁市'
        }, {
          id: '5118',
          text: '雅安市'
        }, {
          id: '5115',
          text: '宜宾市'
        }, {
          id: '5120',
          text: '资阳市'
        }, {
          id: '5103',
          text: '自贡市'
        }]
      }, {
        id: '52',
        text: '贵州',
        children: [{
          id: '5204',
          text: '安顺市'
        }, {
          id: '5205',
          text: '毕节市'
        }, {
          id: '5201',
          text: '贵阳市'
        }, {
          id: '5202',
          text: '六盘水市'
        }, {
          id: '5226',
          text: '黔东南苗族侗族自治州'
        }, {
          id: '5227',
          text: '黔南布依族苗族自治州'
        }, {
          id: '5223',
          text: '黔西南布依族苗族自治州'
        }, {
          id: '5206',
          text: '铜仁市'
        }, {
          id: '5203',
          text: '遵义市'
        }]
      }, {
        id: '53',
        text: '云南',
        children: [{
          id: '5305',
          text: '保山市'
        }, {
          id: '5323',
          text: '楚雄彝族自治州'
        }, {
          id: '5329',
          text: '大理白族自治州'
        }, {
          id: '5331',
          text: '德宏傣族景颇族自治州'
        }, {
          id: '5334',
          text: '迪庆藏族自治州'
        }, {
          id: '5325',
          text: '红河哈尼族彝族自治州'
        }, {
          id: '5301',
          text: '昆明市'
        }, {
          id: '5307',
          text: '丽江市'
        }, {
          id: '5309',
          text: '临沧市'
        }, {
          id: '5333',
          text: '怒江傈僳族自治州'
        }, {
          id: '5308',
          text: '普洱市'
        }, {
          id: '5303',
          text: '曲靖市'
        }, {
          id: '5326',
          text: '文山市'
        }, {
          id: '5328',
          text: '西双版纳傣族自治州'
        }, {
          id: '5304',
          text: '玉溪市'
        }, {
          id: '5306',
          text: '昭通市'
        }]
      }, {
        id: '54',
        text: '西藏',
        children: [{
          id: '5425',
          text: '阿里地区'
        }, {
          id: '5403',
          text: '昌都地区'
        }, {
          id: '5401',
          text: '拉萨市'
        }, {
          id: '5404',
          text: '林芝地区'
        }, {
          id: '5424',
          text: '那曲地区'
        }, {
          id: '5402',
          text: '日喀则地区'
        }, {
          id: '5422',
          text: '山南地区'
        }]
      }]
    }, {
      id: '86',
      text: '西北地区',
      children: [{
        id: '61',
        text: '陕西',
        children: [{
          id: '6109',
          text: '安康市'
        }, {
          id: '6103',
          text: '宝鸡市'
        }, {
          id: '6107',
          text: '汉中市'
        }, {
          id: '6110',
          text: '商洛市'
        }, {
          id: '6102',
          text: '铜川市'
        }, {
          id: '6105',
          text: '渭南市'
        }, {
          id: '6101',
          text: '西安市'
        }, {
          id: '6104',
          text: '咸阳市'
        }, {
          id: '6106',
          text: '延安市'
        }, {
          id: '6108',
          text: '榆林市'
        }]
      }, {
        id: '62',
        text: '甘肃',
        children: [{
          id: '6204',
          text: '白银市'
        }, {
          id: '6211',
          text: '定西市'
        }, {
          id: '6230',
          text: '甘南藏族自治州'
        }, {
          id: '6202',
          text: '嘉峪关市'
        }, {
          id: '6203',
          text: '金昌市'
        }, {
          id: '6209',
          text: '酒泉市'
        }, {
          id: '6201',
          text: '兰州市'
        }, {
          id: '6229',
          text: '临夏回族自治州'
        }, {
          id: '6212',
          text: '陇南市'
        }, {
          id: '6208',
          text: '平凉市'
        }, {
          id: '6210',
          text: '庆阳市'
        }, {
          id: '6205',
          text: '天水市'
        }, {
          id: '6206',
          text: '武威市'
        }, {
          id: '6207',
          text: '张掖市'
        }]
      }, {
        id: '63',
        text: '青海',
        children: [{
          id: '6326',
          text: '果洛藏族自治州'
        }, {
          id: '6302',
          text: '海东地区'
        }, {
          id: '6322',
          text: '海北藏族自治州'
        }, {
          id: '6323',
          text: '黄南藏族自治州'
        }, {
          id: '6325',
          text: '海南藏族自治州'
        }, {
          id: '6328',
          text: '海西蒙古族藏族自治州'
        }, {
          id: '6301',
          text: '西宁市'
        }, {
          id: '6327',
          text: '玉树藏族自治州'
        }]
      }, {
        id: '64',
        text: '宁夏',
        children: [{
          id: '6404',
          text: '固原市'
        }, {
          id: '6402',
          text: '石嘴山市'
        }, {
          id: '6403',
          text: '吴忠市'
        }, {
          id: '6401',
          text: '银川市'
        }, {
          id: '6405',
          text: '中卫市'
        }]
      }, {
        id: '65',
        text: '新疆',
        children: [{
          id: '6529',
          text: '阿克苏地区'
        }, {
          id: '6543',
          text: '阿勒泰市'
        }, {
          id: '6528',
          text: '巴音郭楞蒙古自治州'
        }, {
          id: '6527',
          text: '博尔塔拉蒙古自治州'
        }, {
          id: '6523',
          text: '昌吉回族自治州'
        }, {
          id: '6522',
          text: '哈密市'
        }, {
          id: '6532',
          text: '和田市'
        }, {
          id: '6531',
          text: '喀什市'
        }, {
          id: '6502',
          text: '克拉玛依市'
        }, {
          id: '6542',
          text: '塔城市'
        }, {
          id: '6504',
          text: '吐鲁番市'
        }, {
          id: '6501',
          text: '乌鲁木齐市'
        }, {
          id: '6540',
          text: '伊犁市'
        }, {
          id: '6530',
          text: '克孜勒苏柯尔克孜'
        }, {
          id: '6590',
          text: '自治区直辖'
        }]
      }]
    }, {
      id: '87',
      text: '港澳台',
      children: [{
        id: '8100',
        text: '香港'
      }, {
        id: '8200',
        text: '澳门'
      }, {
        id: '71',
        text: '台湾',
        children: [{
          id: '7101',
          text: '新北市'
        }, {
          id: '7105',
          text: '桃园市'
        }, {
          id: '7117',
          text: '花莲县'
        }, {
          id: '7104',
          text: '台北市'
        }, {
          id: '7114',
          text: '宜兰县'
        }, {
          id: '7115',
          text: '新竹市'
        }, {
          id: '7111',
          text: '新竹县'
        }, {
          id: '7103',
          text: '台中市'
        }, {
          id: '7107',
          text: '彰化县'
        }, {
          id: '7109',
          text: '云林县'
        }, {
          id: '7113',
          text: '南投县'
        }, {
          id: '7110',
          text: '苗栗县'
        }, {
          id: '7118',
          text: '嘉义市'
        }, {
          id: '7102',
          text: '高雄市'
        }, {
          id: '7106',
          text: '台南市'
        }, {
          id: '7112',
          text: '嘉义县'
        }, {
          id: '7121',
          text: '澎湖县'
        }, {
          id: '7108',
          text: '屏东县'
        }, {
          id: '7119',
          text: '台东县'
        }, {
          id: '7120',
          text: '金门县'
        }, {
          id: '7116',
          text: '基隆市'
        }, {
          id: '7122',
          text: '连江县'
        }]
      }]
    }]
  }, {
    id: '999',
    text: '海外'
  }, {
    id: '0',
    text: '其他'
  }];
  return {
    regionList: REGION_LIST,
    regionIds: '11,12,1306,1309,1308,1304,1311,1310,1303,1301,1302,1305,1307,13,1402,1405,1407,1410,1411,1406,1401,1409,1403,1408,1404,14,1529,1508,1502,1504,1506,1501,1507,1505,1503,1509,1525,1522,15,80,2103,2105,2113,2102,2106,2104,2109,2114,2107,2110,2111,2101,2112,2108,21,2208,2206,2202,2204,2203,2207,2205,2224,2201,22,2306,2327,2301,2304,2311,2303,2308,2310,2309,2302,2305,2312,2307,23,81,31,3204,3208,3207,3201,3206,3205,3212,3202,3213,3203,3209,3210,3211,32,3301,3305,3304,3307,3311,3302,3308,3306,3310,3303,3309,33,3408,3403,3416,3417,3411,3412,3401,3406,3404,3410,3415,3405,3407,3402,3413,3418,34,3501,3508,3507,3509,3503,3505,3504,3502,3506,35,3610,3607,3608,3602,3604,3601,3603,3611,3605,3609,3606,36,3716,3714,3705,3717,3701,3708,3712,3715,3713,3702,3711,3709,3710,3707,3706,3704,3703,37,82,4105,4106,4108,4102,4111,4103,4113,4104,4109,4112,4114,4107,4115,4110,4101,4116,4117,4190,41,4207,4211,4202,4208,4210,4203,4213,4201,4212,4206,4209,4205,4228,4290,42,4307,4310,4304,4312,4313,4305,4303,4331,4309,4311,4306,4308,4301,4302,43,83,4451,4419,4406,4401,4416,4413,4407,4452,4409,4414,4418,4405,4415,4402,4403,4417,4453,4408,4412,4420,4404,44,4510,4505,4514,4506,4508,4503,4512,4511,4513,4502,4501,4507,4504,4509,45,4601,4602,4603,4604,4690,46,84,50,5132,5119,5101,5117,5106,5133,5116,5108,5111,5134,5105,5114,5107,5113,5110,5104,5109,5118,5115,5120,5103,51,5204,5205,5201,5202,5226,5227,5223,5206,5203,52,5305,5323,5329,5331,5334,5325,5301,5307,5309,5333,5308,5303,5326,5328,5304,5306,53,5425,5403,5401,5404,5424,5402,5422,54,85,6109,6103,6107,6110,6102,6105,6101,6104,6106,6108,61,6204,6211,6230,6202,6203,6209,6201,6229,6212,6208,6210,6205,6206,6207,62,6326,6302,6322,6323,6325,6328,6301,6327,63,6404,6402,6403,6401,6405,64,6529,6543,6528,6527,6523,6522,6532,6531,6502,6542,6504,6501,6540,6530,6590,65,86,8100,8200,7101,7105,7117,7104,7114,7115,7111,7103,7107,7109,7113,7110,7118,7102,7106,7112,7121,7108,7119,7120,7116,7122,71,87,10,999,0'
  };
})();

export default List;