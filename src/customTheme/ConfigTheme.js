import { ConfigProvider } from 'antd'
import React from 'react'

const ConfigTheme = ({children}) => {
  return (
    <ConfigProvider
        theme={{
            components: {
                Modal: {
                    titleColor: '#B91C1C',
                },
                Tabs: {
                    inkBarColor: '#B91C1C',
                    itemSelectedColor: '#B91C1C',
                    itemHoverColor: '#B91C1C',
                },
                Input: {
                    activeBorderColor: "B91C1C",
                    hoverBorderColor: "B91C1C",
                },
                Slider: {
                    dotActiveColor: "#B91C1C",
                },
                Radio: {
                    buttonSolidCheckedBg: "#B91C1C",
                    buttonSolidCheckedHoverBg: "#B91C1C",
                },
                Button: {
                    colorBgContainer: "#B91C1C",
                    defaultBg: "#B91C1C",
                    defaultColor: "#fff",
                    defaultHoverBorderColor: "#B91C1C",
                    defaultHoverColor: "#fff",
                    defaultActiveBg: "#B91C1C",
                    defaultActiveColor: "#fff",
                    defaultActiveBorderColor: "#B91C1C",
                },
                Menu: {
                    darkItemSelectedBg: "#E83D3D",
                    darkItemSelectedColor: "#fff",
                    darkItemHoverColor: "#B91C1C",
                    darkItemDisabledColor: "#B91C1C",
                }
            }
        }}
    >
        {children}
    </ConfigProvider>
  )
}

export default ConfigTheme