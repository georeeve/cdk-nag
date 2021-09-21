/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/

import { CfnDomain } from '@aws-cdk/aws-elasticsearch';
import { IConstruct, Stack } from '@aws-cdk/core';

/**
 * OpenSearch Service domains have encryption at rest enabled - (Control IDs: 164.312(a)(2)(iv), 164.312(e)(2)(ii))
 * @param node the CfnResource to check
 */
export default function (node: IConstruct): boolean {
  if (node instanceof CfnDomain) {
    const encryptionAtRestOptions = Stack.of(node).resolve(
      node.encryptionAtRestOptions
    );
    if (encryptionAtRestOptions != undefined) {
      if (
        encryptionAtRestOptions.enabled == undefined ||
        encryptionAtRestOptions.enabled == false
      ) {
        return false;
      }
    } else {
      return false;
    }
  }
  return true;
}