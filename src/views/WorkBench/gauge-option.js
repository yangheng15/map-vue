export const option = {
  tooltip: {
    formatter: "{a} <br/>{b} : {c}%"
  },
  toolbox: {
    show: true,
    feature: {
      mark: {
        show: true
      },
      restore: {
        show: true
      },
      saveAsImage: {
        show: true
      }
    }
  },
  series: [{
    name: "业务指标",
    type: "gauge",
    center: ["50%", "70%"],
    radius: "100%", //仪表大小
    startAngle: 180, //开始角度
    endAngle: 0, //结束角度
    axisLine: {
      //   show: false,
      lineStyle: { // 属性lineStyle控制线条样式
        color: [
          [0.25, '#FF6F90'],
          [0.75, '#FFB36F'],
          [1, '#27D9C8'],
        ],
        // shadowColor: "#ccc",
        // shadowBlur: 25,
        width: 40
      }
    },
    splitLine: {
        show: false
    },
    axisTick: {
        show: false
    },
    axisLabel: {
        show: false
    },
    title:{
        show:true,
        offsetCenter: ['0%', '0%'],
        color:'#333',
        fontSize:12,
        zIndex:10
        // backgroundColor:"#D8d8d8",
        // borderRadius:21,
        // padding:5
    },
    detail: {
      formatter : "{score|{value}}",
      offsetCenter: [0, 0],
      backgroundColor: '#FFF',
    //   shadowColor:"#C3Cfff",
    //   shadowBlur:14,
      borderRadius:40,
      width:50,
      rich : {
          score : {
              color : "#333",
              fontSize : 17,
              padding:14
          }
      }
  },
    // detail: {
    //   formatter: "{value}%"
    // },
  data: [{
      value: 80,
      name: "完成率"
    }]
  }]
}
