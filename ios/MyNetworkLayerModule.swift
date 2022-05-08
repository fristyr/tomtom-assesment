//
//  MyNetworkLayerModule.swift
//  tomtomassesment
//
//  Created by Dennis Goncearuc on 08/05/2022.
//

import Foundation


@objc(MyNetworkLayerModule)
class MyNetworkLayerModule: NSObject{
  
  
  @objc
  func get(_ url:NSString,resolve: @escaping RCTPromiseResolveBlock,reject: @escaping RCTPromiseRejectBlock){
    guard let url = URL(string: url as String) else{
          let noUrlError = NSError(domain: "tomtom", code: 350)
          reject("MY_NETWORK_LAYER_MODULE", "Please provide a url endpoint", noUrlError)
          return
      }

      let task = URLSession.shared.dataTask(with: url){
          data, response, error in
        
          if let error = error {
              reject("MY_NETWORK_LAYOUT", "Api Response error", error)
          }
          
          if let data = data, let string = String(data: data, encoding: .utf8){
              resolve(string)
          }
      }

      task.resume()
  }
  
  
  @objc
  static func requiresMainQueueSetup() ->Bool {
    return true;
  }
  
 
  
}
