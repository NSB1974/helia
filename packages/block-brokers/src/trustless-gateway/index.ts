import { TrustlessGatewayBlockBroker } from './broker.js'
import type { BlockRetriever } from '@helia/interface/src/blocks.js'
import type { ComponentLogger } from '@libp2p/interface'
import type { ProgressEvent } from 'progress-events'

export const DEFAULT_TRUSTLESS_GATEWAYS: TrustlessGatewayUrl[] = [
  // 2024-02-20: IPNS and Block/CAR support from https://ipfs.github.io/public-gateway-checker/
  { url: 'https://trustless-gateway.link', supportsSubdomains: false },

  // 2024-02-20: IPNS and Block/CAR support from https://ipfs.github.io/public-gateway-checker/
  { url: 'https://cloudflare-ipfs.com', supportsSubdomains: false },

  // 2024-02-20: IPNS, Origin, and Block/CAR support from https://ipfs.github.io/public-gateway-checker/
  { url: 'https://4everland.io', supportsSubdomains: true }
]

interface TrustlessGatewayUrl {
  url: string | URL
  supportsSubdomains: boolean
}

export type TrustlessGatewayGetBlockProgressEvents =
  ProgressEvent<'trustless-gateway:get-block:fetch', URL>

export interface TrustlessGatewayBlockBrokerInit {
  gateways?: Array<string | URL | TrustlessGatewayUrl>
}

export interface TrustlessGatewayComponents {
  logger: ComponentLogger
}

export function trustlessGateway (init: TrustlessGatewayBlockBrokerInit = {}): (components: TrustlessGatewayComponents) => BlockRetriever {
  return (components) => new TrustlessGatewayBlockBroker(components, init)
}
