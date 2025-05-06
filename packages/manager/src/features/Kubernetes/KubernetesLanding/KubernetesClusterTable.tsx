import {
  type MRT_ColumnDef,
  MRT_Table,
  useMaterialReactTable,
} from 'material-react-table';
import React from 'react';

import type { KubernetesCluster } from '@linode/api-v4';

// type ClusterRow = {
//   cluster: KubernetesCluster;
//   CPU: number;
//   hasUpgrade: boolean;
//   pools: KubeNodePoolResponse[];
//   RAM: number;
//   regionLabel: string;
// };

type KubernetesClusterTableProps = {
  clusters: KubernetesCluster[];
  // openDeleteDialog: (
  //   id: number,
  //   label: string,
  //   pools: KubeNodePoolResponse[]
  // ) => void;
  // openUpgradeDialog: (cluster: KubernetesCluster) => void;
};

export const KubernetesClusterTable = (props: KubernetesClusterTableProps) => {
  const { clusters } = props;

  const columns: MRT_ColumnDef<KubernetesCluster>[] = [
    {
      header: 'Cluster',
      accessorKey: 'label',
      // Cell: ({ row }) => (
      //   <Stack alignItems="center" direction="row" spacing={1}>
      //     <Link to={`/kubernetes/clusters/${row.original.cluster.id}/summary`}>
      //       {row.original.cluster.label}
      //     </Link>
      //     <ClusterChips cluster={row.original.cluster} />
      //   </Stack>
      // ),
    },
    {
      accessorKey: 'k8s_version',
      header: 'Version',
    },
    {
      accessorKey: 'created',
      header: 'Created',
    },
    {
      accessorKey: 'region',
      header: 'Region',
    },
    {
      accessorKey: 'memory',
      header: 'Total Memory',
    },
    {
      accessorKey: 'cpu',
      header: 'Total CPUs',
    },
  ];

  const table = useMaterialReactTable({
    columns,
    data: clusters,
  });
  return <MRT_Table table={table} />;
};
