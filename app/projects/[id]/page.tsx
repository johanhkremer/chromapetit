// import { FC } from 'react';
// import { toast } from 'sonner';
// import ProjectDetail from './components/project-detail';
// import getProjectById from '@/app/actions/projects/getProjectById';
// import Link from 'next/link';

// interface PageProps {
//     params: { id: string };
// }

// const ProjectPage: FC<PageProps> = async ({ params }) => {
//     let project;
//     try {
//         project = await getProjectById(params.id);
//     } catch (error) {
//         toast.error(`Something went wrong: ${(error as Error).message}`);
//         return (
//             <section>
//                 <h1>Project</h1>
//                 <p>Something went wrong. Please try again later.</p>
//                 <Link href="/projects" className="hover:text-opacity-50">
//                     Back to projects
//                 </Link>
//             </section>
//         );
//     }

//     return (
//         <article>
//             <ProjectDetail project={project} />
//         </article>
//     );
// };

// export default ProjectPage;
