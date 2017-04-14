import {module} from 'angular';
import {IModalService} from 'angular-ui-bootstrap';
import {IGceServerGroup} from 'google/domain/index';
import {Application} from 'core/application/application.model';
import {ConfirmationModalService} from 'core/confirmationModal/confirmationModal.service';

class GceAutoHealingPolicyDetailsCtrl implements ng.IComponentController {
  public serverGroup: IGceServerGroup;
  public application: Application;
  public static get $inject() { return ['$uibModal', 'confirmationModalService', 'gceAutoscalingPolicyWriter']; }

  constructor(private $uibModal: IModalService,
              private confirmationModalService: ConfirmationModalService,
              private gceAutoscalingPolicyWriter: any) {}

  public editPolicy(): void {
    this.$uibModal.open({
      templateUrl: require('./modal/upsertAutoHealingPolicy.modal.html'),
      controller: 'gceUpsertAutoHealingPolicyModalCtrl',
      controllerAs: 'ctrl',
      size: 'md',
      resolve: {
        application: () => this.application,
        serverGroup: () => this.serverGroup
      }
    });
};

  public deletePolicy(): void {
    const taskMonitor = {
      application: this.application,
      title: `Deleting autohealing policy for ${this.serverGroup.name}`,
    };

    this.confirmationModalService.confirm({
      header: `Really delete autohealer for ${this.serverGroup.name}?`,
      buttonText: 'Delete autohealer',
      account: this.serverGroup.account,
      taskMonitorConfig: taskMonitor,
      submitMethod: () => this.gceAutoscalingPolicyWriter.deleteAutoHealingPolicy(this.application, this.serverGroup)
    });
  }
}

class GceAutoHealingPolicyDetails implements ng.IComponentOptions {
  public bindings: any = {serverGroup: '<', application: '<'};
  public template = `
    <dt>
      Health Check
      <help-field key="gce.serverGroup.autoHealing"></help-field>
    </dt>
    <dd>{{$ctrl.serverGroup.autoHealingPolicyHealthCheck}}</dd>
    <dt>
      Initial Delay
      <help-field key="gce.serverGroup.initialDelaySec"></help-field>
    </dt>
    <dd>{{$ctrl.serverGroup.initialDelaySec}} seconds</dd>
    <dt ng-if="$ctrl.serverGroup.maxUnavailable">
      Max Unavailable
      <help-field key="gce.serverGroup.maxUnavailable"></help-field>
    </dt>
    <dd ng-if="$ctrl.serverGroup.maxUnavailable">{{$ctrl.serverGroup.maxUnavailable}}</dd>
    <action-icons class="text-right"
                  edit="$ctrl.editPolicy()"
                  edit-info="Edit Policy"
                  destroy="$ctrl.deletePolicy()"
                  destroy-info="Delete Policy">
    </action-icons>`;
  public controller: any = GceAutoHealingPolicyDetailsCtrl;
}

export const GCE_AUTOHEALING_POLICY_DETAILS = 'spinnaker.gce.autoHealingPolicyDetails.component';
module(GCE_AUTOHEALING_POLICY_DETAILS, [])
  .component('gceAutoHealingPolicyDetails', new GceAutoHealingPolicyDetails());
