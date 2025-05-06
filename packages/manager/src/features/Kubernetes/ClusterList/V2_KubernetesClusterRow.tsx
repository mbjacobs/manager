// import { getKubernetesNodePools } from '@linode/api-v4/lib/kubernetes';
// import { useRegionsQuery } from '@linode/queries';
// import { useQueries } from '@tanstack/react-query';

// import { useSpecificTypes } from 'src/queries/types';
// import { extendTypesQueryResult } from 'src/utilities/extendType';

// import {
//   getNextVersion,
//   getTotalClusterMemoryCPUAndStorage,
// } from '../kubeUtils';

// import type {
//   KubernetesCluster,
//   KubeNodePoolResponse,
// } from '@linode/api-v4';

// type ClusterRow = {
//   cluster: KubernetesCluster;
//   hasUpgrade: boolean;
//   regionLabel: string;
//   RAM: number;
//   CPU: number;
//   pools: KubeNodePoolResponse[];
// };

// function fetchNodePools(clusterId: number) {
//   return getKubernetesNodePools(clusterId).then((res) => res.data);
// }

// export function useClusterRows(clusters: KubernetesCluster[]): ClusterRow[] {
//   const { data: regions } = useRegionsQuery();

//   // Fetch node pools per cluster
//   const poolQueries = useQueries({
//     queries: clusters.map((cluster) => ({
//       queryKey: ['kubernetesNodePools', cluster.id],
//       queryFn: () => fetchNodePools(cluster.id),
//       staleTime: 5 * 60 * 1000,
//     })),
//   });

//   // Fetch versions per cluster (based on tier)
//   const versionQueries = useQueries({
//     queries: clusters.map((cluster) => ({
//       queryKey: ['kubernetesVersions', cluster.tier ?? 'standard'],
//       queryFn: () => getKubernetesVersions({ params: { tier } }).then((res) => res.data),
//       staleTime: 5 * 60 * 1000,
//     })),
//   });

//   const allPoolsReady = poolQueries.every((q) => q.isSuccess);
//   const allVersionsReady = versionQueries.every((q) => q.isSuccess);

//   const allNodePools = poolQueries.flatMap((q) => q.data ?? []);
//   const typeIds = allNodePools.map((p) => p.type);
//   const typesQuery = useSpecificTypes(typeIds);
//   const types = extendTypesQueryResult(typesQuery);

//   if (!allPoolsReady || !allVersionsReady || !types || !regions) {
//     return [];
//   }

//   const rows: ClusterRow[] = [];

//   clusters.forEach((cluster, index) => {
//     const pools = poolQueries[index].data ?? [];
//     const versions = versionQueries[index].data ?? [];
//     const { CPU, RAM } = getTotalClusterMemoryCPUAndStorage(pools, types);
//     const nextVersion = getNextVersion(cluster.k8s_version, versions);
//     const hasUpgrade = nextVersion !== null;
//     const regionLabel = regions.find((r) => r.id === cluster.region)?.label ?? cluster.region;

//     rows.push({
//       cluster,
//       hasUpgrade,
//       regionLabel,
//       RAM,
//       CPU,
//       pools,
//     });
//   });

//   return rows;
// }
