const fieldContentData = {
  0: {
    type: "wind",
    name: "风量",
    iconPng: "wind_unselect.png",
    iconPngSelect: "wind_select.png",
    paramsLabel: {
      label: "高度",
      value: "height"
    },
    paramsOptions: [
      {
        atmosphere: "1000百帕",
        height: "0米"
      },
      {
        atmosphere: "850  百帕",
        height: "1500米"
      },
      {
        atmosphere: "700  百帕",
        height: "3000米"
      },
      {
        atmosphere: "500  百帕",
        height: "5500米"
      },
      {
        atmosphere: "300  百帕",
        height: "9200米"
      },
      {
        atmosphere: "200  百帕",
        height: "12000米"
      },
      {
        atmosphere: "100  百帕",
        height: "16000米"
      }
    ]
  },
  1: {
    type: "temperature",
    name: "温度",
    iconPng: "temperature_unselect.png",
    iconPngSelect: "temperature_select.png",
    paramsLabel: "温度",
    paramsLabel: {
      label: "高度",
      value: "height"
    },
    paramsOptions: [
      {
        atmosphere: "1000百帕",
        height: "0米"
      },
      {
        atmosphere: "850  百帕",
        height: "1500米"
      },
      {
        atmosphere: "700  百帕",
        height: "3000米"
      },
      {
        atmosphere: "500  百帕",
        height: "5500米"
      },
      {
        atmosphere: "300  百帕",
        height: "9200米"
      },
      {
        atmosphere: "200  百帕",
        height: "12000米"
      },
      {
        atmosphere: "100  百帕",
        height: "16000米"
      }
    ]
  },
  2: {
    type: "Geopotential_height",
    name: "位势高度",
    iconPng: "Geopotential_height_unselect.png",
    iconPngSelect: "Geopotential_height_select.png",
    paramsLabel: "位势高度",
    paramsLabel: {
      label: "高度",
      value: "height"
    },
    paramsOptions: [
      {
        atmosphere: "1000百帕",
        height: "0米"
      },
      {
        atmosphere: "850  百帕",
        height: "1500米"
      },
      {
        atmosphere: "700  百帕",
        height: "3000米"
      },
      {
        atmosphere: "500  百帕",
        height: "5500米"
      },
      {
        atmosphere: "300  百帕",
        height: "9200米"
      },
      {
        atmosphere: "200  百帕",
        height: "12000米"
      },
      {
        atmosphere: "100  百帕",
        height: "16000米"
      }
    ]
  },
  3: {
    type: "Ice_water_mixing_ratio",
    name: "冰水混合比",
    iconPng: "Ice_water_mixing_ratio_unselect.png",
    iconPngSelect: "Ice_water_mixing_ratio_select.png",
    paramsLabel: "冰水混合比",
    paramsLabel: {
      label: "高度",
      value: "height"
    },
    paramsOptions: [
      {
        atmosphere: "1000百帕",
        height: "0米"
      },
      {
        atmosphere: "850  百帕",
        height: "1500米"
      },
      {
        atmosphere: "700  百帕",
        height: "3000米"
      },
      {
        atmosphere: "500  百帕",
        height: "5500米"
      },
      {
        atmosphere: "300  百帕",
        height: "9200米"
      },
      {
        atmosphere: "200  百帕",
        height: "12000米"
      },
      {
        atmosphere: "100  百帕",
        height: "16000米"
      }
    ]
  },
  4: {
    type: "Precipitable_water",
    name: "可降水量",
    iconPng: "Precipitable_water_unselect.png",
    iconPngSelect: "Precipitable_water_select.png",
    paramsLabel: "可降水量",
    paramsLabel: {
      label: "高度",
      value: "height"
    },
    paramsOptions: [
      {
        atmosphere: "0",
        height: "0"
      }
    ]
  },
  5: {
    type: "Relative_humidity",
    name: "相对湿度",
    iconPng: "Relative_humidity_unselect.png",
    iconPngSelect: "Relative_humidity_select.png",
    paramsLabel: "相对湿度",
    paramsLabel: {
      label: "高度",
      value: "height"
    },
    paramsOptions: [
      {
        atmosphere: "1000百帕",
        height: "0米"
      },
      {
        atmosphere: "850  百帕",
        height: "1500米"
      },
      {
        atmosphere: "700  百帕",
        height: "3000米"
      },
      {
        atmosphere: "500  百帕",
        height: "5500米"
      },
      {
        atmosphere: "300  百帕",
        height: "9200米"
      },
      {
        atmosphere: "200  百帕",
        height: "12000米"
      },
      {
        atmosphere: "100  百帕",
        height: "16000米"
      }
    ]
  },
  6: {
    type: "Total_cloud_cover",
    name: "总云量",
    iconPng: "Total_cloud_cover_unselect.png",
    iconPngSelect: "Total_cloud_cover_select.png",
    paramsLabel: "总云量",
    paramsLabel: {
      label: "高度",
      value: "height"
    },
    paramsOptions: [
      {
        atmosphere: "1000百帕",
        height: "0米"
      },
      {
        atmosphere: "850  百帕",
        height: "1500米"
      },
      {
        atmosphere: "700  百帕",
        height: "3000米"
      },
      {
        atmosphere: "500  百帕",
        height: "5500米"
      },
      {
        atmosphere: "300   百帕",
        height: "9200米"
      },
      {
        atmosphere: "200   百帕",
        height: "12000米"
      },
      {
        atmosphere: "100   百帕",
        height: "16000米"
      }
    ]
  },
  7: {
    type: "Visibility",
    name: "能见度",
    iconPng: "Visibility_unselect.png",
    iconPngSelect: "Visibility_select.png",
    paramsLabel: "能见度",
    paramsLabel: {
      label: "高度",
      value: "height"
    },
    paramsOptions: [
      {
        atmosphere: "0",
        height: "0"
      }
    ]
  },
  8: {
    type: "Vertical_velocity",
    name: "垂直风",
    iconPng: "Vertical_velocity_unselect.png",
    iconPngSelect: "Vertical_velocity_select.png",
    paramsLabel: "垂直风",
    paramsLabel: {
      label: "高度",
      value: "height"
    },
    paramsOptions: [
      {
        atmosphere: "1000百帕",
        height: "0米"
      }
    ]
  },
  9: {
    type: "Wind_speed_gust",
    name: "阵风",
    iconPng: "Wind_speed_gust_unselect.png",
    iconPngSelect: "Wind_speed_gust_select.png",
    paramsLabel: "阵风",
    paramsLabel: {
      label: "高度",
      value: "height"
    },
    paramsOptions: [
      {
        atmosphere: "0",
        height: "0"
      }
    ]
  }
  // 10: {
  //   type: "Wind_speed_gust",
  //   name: "test_heatmap",
  //   iconPng: "Wind_speed_gust_unselect.png",
  //   iconPngSelect: "Wind_speed_gust_select.png",
  //   paramsLabel: "test_heatmap",
  //   paramsLabel: {
  //     label: "高度",
  //     value: "height"
  //   },
  //   paramsOptions: [
  //     {
  //       atmosphere: "0",
  //       height: "0"
  //     }
  //   ]
  // }
};
export default fieldContentData;
