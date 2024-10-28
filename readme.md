# Service Name

...

semantic release docs:
- https://github.com/semantic-release/semantic-release
fix, feat, ...


generating javascript code of the proto file:
`
pbjs -t static-module -w commonjs -o src/proto/basket/basket_pb.js src/proto/basket/basket.proto
`

generating typescript code of the proto file:
`
pbts -o src/proto/basket/basket_pb.ts src/proto/basket/basket_pb.js
`
