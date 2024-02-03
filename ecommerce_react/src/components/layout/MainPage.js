import { Spin } from 'antd'
import React from 'react'

function MainPage({
    children,
    loading=false
}) {
  return (
    <div>
        <Spin spinning={loading}>
            <div>
                {children}
            </div>
        </Spin>
    </div>
  )
}

export default MainPage