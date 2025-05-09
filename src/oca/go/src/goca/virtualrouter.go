/* -------------------------------------------------------------------------- */
/* Copyright 2002-2025, OpenNebula Project, OpenNebula Systems                */
/*                                                                            */
/* Licensed under the Apache License, Version 2.0 (the "License"); you may    */
/* not use this file except in compliance with the License. You may obtain    */
/* a copy of the License at                                                   */
/*                                                                            */
/* http://www.apache.org/licenses/LICENSE-2.0                                 */
/*                                                                            */
/* Unless required by applicable law or agreed to in writing, software        */
/* distributed under the License is distributed on an "AS IS" BASIS,          */
/* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.   */
/* See the License for the specific language governing permissions and        */
/* limitations under the License.                                             */
/*--------------------------------------------------------------------------- */

package goca

import (
	"context"
	"encoding/xml"
	"errors"

	"github.com/OpenNebula/one/src/oca/go/src/goca/parameters"
	"github.com/OpenNebula/one/src/oca/go/src/goca/schemas/shared"
	vr "github.com/OpenNebula/one/src/oca/go/src/goca/schemas/virtualrouter"
)

// VirtualRoutersController is a controller for a pool of VirtualRouters
type VirtualRoutersController entitiesController

// VirtualRouterController is a controller for VirtualRouter entities
type VirtualRouterController entityController

// VirtualRouters returns a VirtualRouters controller.
func (c *Controller) VirtualRouters() *VirtualRoutersController {
	return &VirtualRoutersController{c}
}

// VirtualRouter returns a VirtualRouter controller.
func (c *Controller) VirtualRouter(id int) *VirtualRouterController {
	return &VirtualRouterController{c, id}
}

// VirtualRouterByName returns a VirtualRouter By name
func (c *Controller) VirtualRouterByName(name string, args ...int) (int, error) {
	return c.VirtualRouterByNameContext(context.Background(), name, args...)
}

// VirtualRouterByNameContext returns a VirtualRouter By name
func (c *Controller) VirtualRouterByNameContext(ctx context.Context, name string, args ...int) (int, error) {

	vrouterPool, err := (&VirtualRoutersController{c}).InfoContext(ctx, args...)
	var id int
	if err != nil {
		return -1, err
	}

	match := false
	for i := 0; i < len(vrouterPool.VirtualRouters); i++ {
		if vrouterPool.VirtualRouters[i].Name == name {
			if match {
				return -1, errors.New("multiple resources with that name")
			}
			id = vrouterPool.VirtualRouters[i].ID
			match = true
		}
	}
	if !match {
		return -1, errors.New("resource not found")
	}

	return id, nil
}

// Info returns a virtual router pool. A connection to OpenNebula is
// performed.
func (vc *VirtualRoutersController) Info(args ...int) (*vr.Pool, error) {
	return vc.InfoContext(context.Background(), args...)
}

// InfoContext returns a virtual router pool. A connection to OpenNebula is
// performed.
func (vc *VirtualRoutersController) InfoContext(ctx context.Context, args ...int) (*vr.Pool, error) {
	var who, start, end int

	switch len(args) {
	case 0:
		who = parameters.PoolWhoAll
		start = -1
		end = -1
	case 3:
		who = args[0]
		start = args[1]
		end = args[2]
	default:
		return nil, errors.New("Wrong number of arguments")
	}

	response, err := vc.c.Client.CallContext(ctx, "one.vrouterpool.info", who, start, end)
	if err != nil {
		return nil, err
	}

	vrouterPool := &vr.Pool{}

	err = xml.Unmarshal([]byte(response.Body()), vrouterPool)
	if err != nil {
		return nil, err
	}

	return vrouterPool, nil
}

// Info connects to OpenNebula and fetches the information of the VirtualRouter
func (vc *VirtualRouterController) Info(decrypt bool) (*vr.VirtualRouter, error) {
	return vc.InfoContext(context.Background(), decrypt)
}

// InfoContext connects to OpenNebula and fetches the information of the VirtualRouter
func (vc *VirtualRouterController) InfoContext(ctx context.Context, decrypt bool) (*vr.VirtualRouter, error) {
	response, err := vc.c.Client.CallContext(ctx, "one.vrouter.info", vc.ID, decrypt)
	if err != nil {
		return nil, err
	}
	vr := &vr.VirtualRouter{}
	err = xml.Unmarshal([]byte(response.Body()), vr)
	if err != nil {
		return nil, err
	}

	return vr, nil
}

// Create allocates a new virtual router. It returns the new Virtual Router ID
// * tpl: template of the marketplace
func (vc *VirtualRoutersController) Create(tpl string) (int, error) {
	return vc.CreateContext(context.Background(), tpl)
}

// CreateContext allocates a new virtual router. It returns the new Virtual Router ID
// * ctx: context for cancelation
// * tpl: template of the marketplace
func (vc *VirtualRoutersController) CreateContext(ctx context.Context, tpl string) (int, error) {
	response, err := vc.c.Client.CallContext(ctx, "one.vrouter.allocate", tpl)
	if err != nil {
		return -1, err
	}

	return response.BodyInt(), nil
}

// Update adds virtual router content.
//   - tpl: The new virtual router contents. Syntax can be the usual attribute=value or XML.
//   - uType: Update type: Replace: Replace the whole template.
//     Merge: Merge new template with the existing one.
func (vc *VirtualRouterController) Update(tpl string, uType parameters.UpdateType) error {
	return vc.UpdateContext(context.Background(), tpl, uType)
}

// UpdateContext adds virtual router content.
//   - ctx: context for cancelation
//   - tpl: The new virtual router contents. Syntax can be the usual attribute=value or XML.
//   - uType: Update type: Replace: Replace the whole template.
//     Merge: Merge new template with the existing one.
func (vc *VirtualRouterController) UpdateContext(ctx context.Context, tpl string, uType parameters.UpdateType) error {
	_, err := vc.c.Client.CallContext(ctx, "one.vrouter.update", vc.ID, tpl, uType)
	return err
}

// Chown changes the owner/group of a virtual router. If uid or gid is -1 it will not
// change
func (vc *VirtualRouterController) Chown(uid, gid int) error {
	return vc.ChownContext(context.Background(), uid, gid)
}

// ChownContext changes the owner/group of a virtual router. If uid or gid is -1 it will not
// change
func (vc *VirtualRouterController) ChownContext(ctx context.Context, uid, gid int) error {
	_, err := vc.c.Client.CallContext(ctx, "one.vrouter.chown", vc.ID, uid, gid)
	return err
}

// Chmod changes the permissions of a virtual router. If any perm is -1 it will not
// change
func (vc *VirtualRouterController) Chmod(perm shared.Permissions) error {
	return vc.ChmodContext(context.Background(), perm)
}

// ChmodContext changes the permissions of a virtual router. If any perm is -1 it will not
// change
func (vc *VirtualRouterController) ChmodContext(ctx context.Context, perm shared.Permissions) error {
	args := append([]interface{}{vc.ID}, perm.ToArgs()...)

	_, err := vc.c.Client.CallContext(ctx, "one.vrouter.chmod", args...)
	return err
}

// Rename changes the name of virtual router
func (vc *VirtualRouterController) Rename(newName string) error {
	return vc.RenameContext(context.Background(), newName)
}

// RenameContext changes the name of virtual router
func (vc *VirtualRouterController) RenameContext(ctx context.Context, newName string) error {
	_, err := vc.c.Client.CallContext(ctx, "one.vrouter.rename", vc.ID, newName)
	return err
}

// Delete will remove the virtual router from OpenNebula.
func (vc *VirtualRouterController) Delete() error {
	return vc.DeleteContext(context.Background())
}

// DeleteContext will remove the virtual router from OpenNebula.
func (vc *VirtualRouterController) DeleteContext(ctx context.Context) error {
	_, err := vc.c.Client.CallContext(ctx, "one.vrouter.delete", vc.ID)
	return err
}

// Instantiate will instantiate the virtual router. It returns the ID of the new VM
// * number: Number of VMs to instantiate.
// * tplid: VM Template id to instantiate.
// * name: Name for the VM instances. If it is an empty string OpenNebula will set a default name. Wildcard %i can be used.
// * hold: False to create the VM on pending (default), True to create it on hold.
// * extra: A string containing an extra template to be merged with the one being instantiated. It can be empty. Syntax can be the usual attribute=value or XML.
func (vc *VirtualRouterController) Instantiate(number, tplid int, name string, hold bool, extra string) (int, error) {
	return vc.InstantiateContext(context.Background(), number, tplid, name, hold, extra)
}

// InstantiateContext will instantiate the virtual router. It returns the ID of the new VM
// * ctx: context for cancelation
// * number: Number of VMs to instantiate.
// * tplid: VM Template id to instantiate.
// * name: Name for the VM instances. If it is an empty string OpenNebula will set a default name. Wildcard %i can be used.
// * hold: False to create the VM on pending (default), True to create it on hold.
// * extra: A string containing an extra template to be merged with the one being instantiated. It can be empty. Syntax can be the usual attribute=value or XML.
func (vc *VirtualRouterController) InstantiateContext(ctx context.Context, number, tplid int, name string, hold bool, extra string) (int, error) {
	response, err := vc.c.Client.CallContext(ctx, "one.vrouter.instantiate", vc.ID, number, tplid, name, hold, extra)

	if err != nil {
		return -1, err
	}

	return response.BodyInt(), nil
}

// AttachNic attaches a new network interface to the virtual router and the virtual machines.
// * tpl: NIC template string
func (vc *VirtualRouterController) AttachNic(tpl string) error {
	return vc.AttachNicContext(context.Background(), tpl)
}

// AttachNicContext attaches a new network interface to the virtual router and the virtual machines.
// * ctx: context for cancelation
// * tpl: NIC template string
func (vc *VirtualRouterController) AttachNicContext(ctx context.Context, tpl string) error {
	_, err := vc.c.Client.CallContext(ctx, "one.vrouter.attachnic", vc.ID, tpl)
	return err
}

// DetachNic detaches a network interface from the virtual router and the virtual machines
// * nicid: NIC ID to detach
func (vc *VirtualRouterController) DetachNic(nicid int) error {
	return vc.DetachNicContext(context.Background(), nicid)
}

// DetachNicContext detaches a network interface from the virtual router and the virtual machines
// * ctx: context for cancelation
// * nicid: NIC ID to detach
func (vc *VirtualRouterController) DetachNicContext(ctx context.Context, nicid int) error {
	_, err := vc.c.Client.CallContext(ctx, "one.vrouter.detachnic", vc.ID, nicid)
	return err
}

// Lock locks the virtual router depending on blocking level. See levels in locks.go.
func (vc *VirtualRouterController) Lock(level shared.LockLevel) error {
	return vc.LockContext(context.Background(), level)
}

// LockContext locks the virtual router depending on blocking level. See levels in locks.go.
func (vc *VirtualRouterController) LockContext(ctx context.Context, level shared.LockLevel) error {
	_, err := vc.c.Client.CallContext(ctx, "one.vrouter.lock", vc.ID, level)
	return err
}

// Unlock unlocks the virtual router.
func (vc *VirtualRouterController) Unlock() error {
	return vc.UnlockContext(context.Background())
}

// UnlockContext unlocks the virtual router.
func (vc *VirtualRouterController) UnlockContext(ctx context.Context) error {
	_, err := vc.c.Client.CallContext(ctx, "one.vrouter.unlock", vc.ID)
	return err
}
