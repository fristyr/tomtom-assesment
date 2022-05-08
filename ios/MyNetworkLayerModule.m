//
//  MyNetworkLayerModule.m
//  tomtomassesment
//
//  Created by Dennis Goncearuc on 08/05/2022.
//

#import <Foundation/Foundation.h>

#import "React/RCTBridgeModule.h"
 
@interface RCT_EXTERN_MODULE(MyNetworkLayerModule, NSObject)

RCT_EXTERN_METHOD(get:(NSString)url resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject )


@end
