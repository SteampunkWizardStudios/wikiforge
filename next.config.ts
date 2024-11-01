import type { NextConfig } from 'next'

const config: NextConfig = {
    devIndicators: {
        appIsrStatus: true,
        buildActivity: true,
        buildActivityPosition: 'bottom-right'
    }
} satisfies NextConfig

export default config;